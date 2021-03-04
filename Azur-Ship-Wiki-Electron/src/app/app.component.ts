import { Component } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree/';

interface MenuNode {
	name: string;
	link?: string;
	children?: MenuNode[];
}
interface FlatNode {
	expandable: boolean;
	name: string;
	level: number;
	link: string;
}
const MENU_DATA: MenuNode[] = [{
	name: 'Azur Lane',
	children: [
		{ name: 'Ship List', link: 'ship-list' },
		{ name: 'Equipment List', link: 'equipment-list' }
	]
}]

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	private _transformer = (node: MenuNode, level: number) => {
		let flatNode = {
			expandable: !!node.children && node.children.length > 0,
			name: node.name,
			level: level,
			link: node.link !== undefined ? node.link : ''
		};

		return flatNode;
	}
	treeControl = new FlatTreeControl<FlatNode>(
		node => node.level, node => node.expandable
	);
	treeFlattener = new MatTreeFlattener(
		this._transformer, node => node.level, node => node.expandable, node => node.children);
	dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

	constructor() {
		this.dataSource.data = MENU_DATA
	}
	hasChild = (_: number, node: FlatNode) => node.expandable;
}
