import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { AutoClose } from '../../../../services/util/autoclose.service';

@Component({
  selector: 'qm-list-item',
  templateUrl: './qm-list-item.component.html',
  styleUrls: ['./qm-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QmListItemComponent implements OnInit {
  @Input() userDirection: string;

  @Input() isSelected = false;

  @Input() centerText = false;

  @Input() inputType: string;

  @Input() name: string;

  @Input() title = '';

  @Input() time = '';

  @Input() text = '';

  @Output() optionClicked = new EventEmitter();

  constructor(public autoCloseService: AutoClose) {}

  ngOnInit() {}

  handleClick($event) {
    this.optionClicked.emit($event);
  }

  isTimeItem(): boolean {
    return this.time !== '';
  }
}
