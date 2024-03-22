import {bootstrap} from 'angular2/angular2';
import {Component, Directive, View} from 'angular2/angular2';
import {ExampleComponent} from './example-component';
import "./index.css";

@Component({
  selector: 'example-app',
})
@View({
  template: '<example-component></example-component>',
  directives: [ExampleComponent] 
})
export class ExampleApp {}
bootstrap(ExampleApp);
