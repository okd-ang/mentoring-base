import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'test-reactive-for',
  standalone: true,
  imports: [CommonModule, 
    ReactiveFormsModule,
    MatFormFielModule, 
    MatInputModule, 
    MatButton ],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactiveFormComponent {
  
}