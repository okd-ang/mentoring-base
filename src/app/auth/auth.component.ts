import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { WhiteDirective } from '../directives/white.directive';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, WhiteDirective],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
