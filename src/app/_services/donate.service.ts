import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Donation } from '../_models/donation';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import {Fur} from '../_models/fur';
import {AdoptRequest} from '../_models/adopt-request';
import {ImageModel} from '../_models/image';

@Injectable({
  providedIn: 'root'
})
export class DonateService {
    private basePath = 'donation';
    private storageBasePath = 'images/donation/';
    private donationRef: AngularFireList<any>;
    private donations: Observable<any[]>;

    constructor(
        private fireDatabase: AngularFireDatabase,
        public utilsService: UtilsService,
        private router: Router
    ) {}

    index(query: any = null) {
        this.donationRef = this.fireDatabase.list<Donation>(this.basePath, query);
        this.donations = this.utilsService.setKeys(this.donationRef);
        return this.donations;
    }

    show(uid: string) {
        this.donationRef = this.fireDatabase.list<Donation>(this.basePath, ref => {
            return ref.orderByChild('uid').equalTo(uid);
        });
        this.donations = this.utilsService.setKeys(this.donationRef);
        return this.donations;
    }

    create(donation: Donation) {
        return new Promise(resolve => {
            this.donationRef = this.fireDatabase.list<Donation>(this.basePath);

            // Set donation unique identifier
            donation.uid = this.utilsService.generateRandomUid();

            const startCreating = async () => {
                // Upload images, then replace donate images
                donation.images = await this.uploadImages(
                    donation.images,
                    donation.uid
                );

                // Set donation date
                donation.date = moment().locale('es').format('YYYY-MM-DD');

                // Save donation and set new key
                const newRef = this.donationRef.push(donation);
                donation.key = newRef.key;
                return true;
            };

            startCreating().then(res => {
                if (res) {
                    resolve(donation);
                } else {
                    resolve(null);
                }
            });
        });
    }

    update(donation: Donation) {
        return new Promise(resolve => {
            this.donationRef = this.fireDatabase.list<Donation>(this.basePath);

            if (donation.approved && !donation.collected) {
                // Set collected estimated date
                donation.collected_estimated_date = moment(donation.collected_estimated_date).locale('es').format('YYYY-MM-DD');
            }

            if (donation.collected) {
                // Set collected date
                donation.collected_date = moment().locale('es').format('YYYY-MM-DD');
            }

            // Update donation
            this.donationRef.update(donation.key + '', {
                name: donation.name,
                email: donation.email,
                amount: donation.amount,
                description: donation.description,
                is_money: donation.is_money,
                collected: donation.collected,
                approved: donation.approved,
                collected_date: donation.collected_date,
                collected_estimated_date: donation.collected_estimated_date,
                date: donation.date,
                address: donation.address,
                images: donation.images
            });

            resolve(donation);
        });
    }

    async uploadImages(images: ImageModel[], uid: string) {
        for (let index = 0; index < images.length; index++) {
            const pathName = this.storageBasePath + uid + '-0' + (index + 1);

            await this.utilsService.uploadFile(images[index].file, pathName).then(res => {
                if (res !== '') {
                    images[index].url = res + '';
                }
            });
        }

        return images;
    }

    orderBy(prop: string, value: any) {
        return this.index(ref => {
            return ref.orderByChild(prop).equalTo(value);
        });
    }

    goToDetail(uid: string) {
        this.router.navigate(['/administrador/donacion/' + uid]);
    }
}
