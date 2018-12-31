import { Component, OnInit } from '@angular/core';
import { Post } from '../../../_models/post';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '../../../_services/utils.service';
import { PostService } from '../../../_services/post.service';

@Component({
    selector: 'app-post-content',
    templateUrl: './post-content.component.html',
    styleUrls: ['./post-content.component.scss']
})
export class PostContentComponent implements OnInit {
    public post: Post = new Post();
    public description: string;

    constructor(
        private route: ActivatedRoute,
        public utilsService: UtilsService,
        public postService: PostService
    ) {}

    ngOnInit() {
        this.description = 'Échale un vistazo a la publicación de Milagros del Rincón';

        this.route.params.subscribe(params => {
            const uid = params.uid;

            this.utilsService.showSnackbar('Cargando...');
            this.postService.show(uid).subscribe(response => {
                this.post = response[0] as Post;
            });
        });
    }
}
