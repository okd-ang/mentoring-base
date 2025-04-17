import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { YellowDirective } from '../directives/yellow.directive';
import { AuthComponent } from '../auth/auth.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../user.service';

const aboutCompanyFn = (text: string) => text;
const aboutCompany = aboutCompanyFn('Окомпании');

const menuItems = [
  'Каталог',
  'Стройматериалы',
  'Инструменты',
  'Электрика',
  'Интерьер и одежда',
];

const upperCaseMenuItems: string[] = menuItems.map((item: string): string => {
  return item.toUpperCase();
});

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, YellowDirective, AsyncPipe, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  
  isShowCatalog = true;

  private readonly dialog = inject(MatDialog);
  public readonly userService = inject(UserService);
  readonly headerItem1 = 'Главная';
  readonly headerItem2 = 'О компании';
  readonly headerItem3 = 'Каталог';

  readonly header2Item1 = 'Каталог';
  readonly header2Item2 = 'Стройматериалы';
  readonly header2Item3 = 'Инструменты';
  readonly header2Item4 = 'Электрика';
  readonly header2Item5 = 'Интерьер и одежда';

  readonly aboutCompany = aboutCompany;

  menuItems: string[] = upperCaseMenuItems;

  isUpperCase: boolean = true;

  changeMenuText(): void {
    this.menuItems = upperCaseMenuItems.map((item) =>
      this.isUpperCase ? item.toLowerCase() : item.toUpperCase()
    );
    this.isUpperCase = !this.isUpperCase;
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: '400px',
      height: '200px',
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'admin') {
        this.userService.loginAsAdmin();
      } else if (result === 'user') {
        this.userService.loginAsUser();
      } else return undefined;
    });
  }

  public logout() {
    if (confirm('Вы точно хотите выйти?')) {
      return this.userService.logout();
    } else return false;
  }

}
