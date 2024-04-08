import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Enquetes',
                items: [
                    {
                        label: 'Home',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/'],
                    },
                    {
                        label: 'Listar',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/survey'],
                    },
                ],
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                // items: [
                //     {
                //         label: 'Auth',
                //         icon: 'pi pi-fw pi-user',
                //         items: [
                //             {
                //                 label: 'Login',
                //                 icon: 'pi pi-fw pi-sign-in',
                //                 routerLink: ['/auth/login'],
                //             },
                //             {
                //                 label: 'Error',
                //                 icon: 'pi pi-fw pi-times-circle',
                //                 routerLink: ['/auth/error'],
                //             },
                //             {
                //                 label: 'Access Denied',
                //                 icon: 'pi pi-fw pi-lock',
                //                 routerLink: ['/auth/access'],
                //             },
                //         ],
                //     },
                //     {
                //         label: 'Not Found',
                //         icon: 'pi pi-fw pi-exclamation-circle',
                //         routerLink: ['/notfound'],
                //     },
                //     {
                //         label: 'Empty',
                //         icon: 'pi pi-fw pi-circle-off',
                //         routerLink: ['/pages/empty'],
                //     },
                // ],
            },
        ];
    }
}
