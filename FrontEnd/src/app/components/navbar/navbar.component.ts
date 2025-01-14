/* tslint:disable:only-arrow-functions prefer-const triple-equals prefer-for-of */
import {Component, OnInit, ElementRef, OnDestroy} from '@angular/core';
import {ROUTES} from '../sidebar/sidebar.component';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {MdbModalRef, MdbModalService} from 'mdb-angular-ui-kit/modal';
import {SearchDepartementModal} from '../serach-departement-modal/serach-departement-modal.component';
import {SignInComponent} from '../sign-in/sign-in.component';
import {LogInComponent} from '../log-in/log-in.component';
import {User} from '../../Model/User';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

    constructor(
        location: Location,
        private element: ElementRef,
        private router: Router,
        private modalService2: MdbModalService,
        private modalService: NgbModal
    ) {
        this.location = location;
        this.sidebarVisible = false;
    }

    private listTitles: any[];
    location: Location;
    // tslint:disable-next-line:variable-name
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    authentifier: boolean;
    user: User = {
        mail: '',
        pass: '',
        fonction: '',
        username: ''
    };
    public isCollapsed = true;

    closeResult: string;

    modalRef: MdbModalRef<SignInComponent>;
    // function that adds color white/transparent to the navbar on resize (this is for the collapse)
    updateColor = () => {
        const navbar = document.getElementsByClassName('navbar')[0];
        if (window.innerWidth < 993 && !this.isCollapsed) {
            navbar.classList.add('bg-white');
            navbar.classList.remove('navbar-transparent');
        } else {
            navbar.classList.remove('bg-white');
            navbar.classList.add('navbar-transparent');
        }
    };

    ngOnInit() {
        // this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        if (JSON.parse(sessionStorage.getItem('currentUser')) !== null) {
            this.user = JSON.parse(sessionStorage.getItem('currentUser'));
        }
        this.authentifier = JSON.parse(sessionStorage.getItem('currentUser')) === null;
        window.addEventListener('resize', this.updateColor);
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe(event => {
            this.sidebarClose();
            const $layer: any = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
                this.mobile_menu_visible = 0;
            }
        });
    }

    collapse() {
        this.isCollapsed = !this.isCollapsed;
        const navbar = document.getElementsByTagName('nav')[0];
        if (!this.isCollapsed) {
            navbar.classList.remove('navbar-transparent');
            navbar.classList.add('bg-white');
        } else {
            navbar.classList.add('navbar-transparent');
            navbar.classList.remove('bg-white');
        }
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const mainPanel = (
            document.getElementsByClassName('main-panel')[0]
        ) as HTMLElement;
        const html = document.getElementsByTagName('html')[0];
        if (window.innerWidth < 991) {
            mainPanel.style.position = 'fixed';
        }

        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);

        html.classList.add('nav-open');

        this.sidebarVisible = true;
    }

    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        this.toggleButton.classList.remove('toggled');
        const mainPanel = (
            document.getElementsByClassName('main-panel')[0]
        ) as HTMLElement;

        if (window.innerWidth < 991) {
            setTimeout(function () {
                mainPanel.style.position = '';
            }, 500);
        }
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    }

    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        const $layer = document.createElement('div');
// const html = document.getElementsByTagName('html')[0];
        const $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const html = document.getElementsByTagName('html')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            html.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            $layer.setAttribute('class', 'close-layer');

            if (html.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (html.classList.contains('off-canvas-sidebar')) {
                document
                    .getElementsByClassName('wrapper-full-page')[0]
                    .appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () {
                // asign a function
                html.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            html.classList.add('nav-open');
            this.mobile_menu_visible = 1;
        }
    }

    getTitle() {
        let titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }

        for (let item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        const index = titlee.indexOf('/', 1);
        if (index !== -1) {
            titlee = titlee.substring(1, index);
        }
        switch (titlee) {
            case 'projet_recherche':
                titlee = 'Gestion de Projets De Recherche';
                break;
            case 'department':
                titlee = 'Gestion des Départments';
                break;
            case 'emp':
                titlee = 'Gestion des Employés';
                break;
            case 'bureau':
                titlee = 'Gestion des Bureaux';
                break;
            case 'tel':
                titlee = 'Gestion De Poste Téléphonique';
                break;
            case 'etude':
                titlee = 'Gestion Des Études';
                break;
            default :
                titlee = '';
        }
        return titlee;
    }

    open(content) {
        this.modalService.open(content, {windowClass: 'modal-search'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    ngOnDestroy() {
        window.removeEventListener('resize', this.updateColor);
    }

    SingIn() {
        this.modalRef = this.modalService2.open(SignInComponent);
        this.router.navigate(['dashboard']);
    }

    LogIn() {
        this.modalRef = this.modalService2.open(LogInComponent);
        this.router.navigate(['dashboard']);
    }

    logout() {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['dashboard']).then(
            () => {
                window.location.reload();
            }
        );

    }

    profile() {
        this.router.navigate(['profile']);
    }

    users() {
        this.router.navigate(['users']);
    }
}
