export class DragAndDropMouse {
	draggable: HTMLDivElement;
	dragTrigger: HTMLDivElement;
	mouseShift: { x: number, y: number } = { x: 0, y: 0 }

	constructor() {
		this.draggable = document.querySelector<HTMLDivElement>('.draggable')!
		this.dragTrigger = this.draggable.querySelector<HTMLDivElement>('.dragTrigger')!

		this.dragTrigger.addEventListener('mousedown', this.dragStart.bind(this))
	}

	dragStart(event: MouseEvent) {
		const { left, top } = this.draggable.getBoundingClientRect()
		this.mouseShift.x = event.clientX - left
		this.mouseShift.y = event.clientY - top
		document.onmouseup = this.dragStop.bind(this)
		document.onmousemove = this.dragElement.bind(this)
	}

	dragElement(event: MouseEvent) {
		if (this.draggable.style.transform !== 'none') {
			this.draggable.style.transform = 'none'
		}

		this.draggable.style.left = event.pageX - this.mouseShift.x + 'px'
		this.draggable.style.top = event.pageY - this.mouseShift.y + 'px'
	}

	dragStop() {
		document.onmouseup = null
		document.onmousemove = null
		this.mouseShift = { x: 0, y: 0 }
	}
}
