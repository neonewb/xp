class DragAndDropNative {
	draggable: HTMLDivElement;
	dragTrigger: HTMLDivElement;
	dropZone: HTMLDivElement;
	offset: {x: number, y: number} = {x: 0, y: 0};

	constructor() {
		this.dropZone = document.querySelector<HTMLDivElement>('.dropZone')!
		this.draggable = document.querySelector<HTMLDivElement>('.draggable')!
		this.dragTrigger = this.draggable.querySelector<HTMLDivElement>('.dragTrigger')!

		this.dropZone.addEventListener('dragover', this.dragOverDropZone.bind(this))
		this.dropZone.addEventListener('drop', this.drop.bind(this))
		this.dragTrigger.addEventListener('mouseenter', this.enableDrag.bind(this))
		this.dragTrigger.addEventListener('mouseleave', this.disableDrag.bind(this))
		this.draggable.addEventListener('dragstart', this.drag.bind(this))
	}

	drag(event: DragEvent) {
		const rect = (event.target as HTMLDivElement)?.getBoundingClientRect();
		this.offset.x = event.clientX - rect.x;
		this.offset.y = event.clientY - rect.y;
		this.draggable.style.transition = '0.01s'
		this.draggable.style.transform = 'translateX(-9999px)'
	}

	drop(event: DragEvent) {
		event.preventDefault()
		window.requestAnimationFrame(() => {
			this.draggable.style.top = event.clientY - this.offset.y + 'px'
			this.draggable.style.left =  event.clientX - this.offset.x + 'px'
			this.draggable.style.transition = 'none'
			this.draggable.style.transform = 'none'
			this.offset = {x: 0, y: 0}
		})
	}

	dragOverDropZone(event: DragEvent) {
		event.preventDefault()
	}

	enableDrag() {
		this.draggable.setAttribute('draggable', 'true')
	}

	disableDrag() {
		this.draggable.setAttribute('draggable', 'false')
	}
}

new DragAndDropNative()