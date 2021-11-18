const showTooltip = (e, elem, toolTipDiv) => {
	toolTipDiv.style.display = 'block';
	toolTipDiv.innerHTML = elem.dataset.tooltip;
	const position = elem.dataset.position;
	switch (position) {
		case ('top'):
			const distanceFromTop = elem.offsetTop - toolTipDiv.offsetHeight;
			if (distanceFromTop < toolTipDiv.offsetHeight) {
				elem.dataset.position = 'right';
				break;
			}
			toolTipDiv.style.top = distanceFromTop + 'px';
			toolTipDiv.style.left = elem.offsetLeft + 'px';
			break;
		case ('right'):
			const distanceFromRight = window.innerWidth - (elem.offsetLeft + elem.offsetWidth + toolTipDiv.offsetWidth);
			if (distanceFromRight < toolTipDiv.offsetWidth) {
				elem.dataset.position = 'bottom';
				break;
			}
			toolTipDiv.style.top = elem.offsetTop + 'px';
			toolTipDiv.style.left = elem.offsetLeft + elem.offsetWidth + 'px';
			break;
		case ('bottom'):
			const distanceFromBottom = window.innerHeight - (elem.offsetTop + elem.offsetHeight + toolTipDiv.offsetHeight);
			if (distanceFromBottom < toolTipDiv.offsetHeight) {
				elem.dataset.position = 'left';
				break;
			}
			toolTipDiv.style.top = elem.offsetTop + elem.offsetHeight + 'px';
			toolTipDiv.style.left = elem.offsetLeft + 'px';
			break;
		case ('left'):
			const distanceFromLeft = elem.offsetLeft - toolTipDiv.offsetWidth;
			if (distanceFromLeft < toolTipDiv.offsetWidth) {
				elem.dataset.position = 'top';
				break;
			}
			toolTipDiv.style.top = elem.offsetTop + 'px';
			toolTipDiv.style.left = distanceFromLeft + 'px';
			break;
		default:
			toolTipDiv.style.top = e.pageY + 'px';
			toolTipDiv.style.left = e.pageX + 'px';
			break;
	}
	toolTipDiv.style.opacity = '1';
}

const hideTooltip = (toolTipDiv) => {
	toolTipDiv.style.opacity = '0';
	toolTipDiv.style.display = 'none';
}

const displayTooltips = () => {
	const toolTipDiv = document.querySelector('.tooltip')
	const toolTipElements = Array.from(document.querySelectorAll('.need-tooltip'))
	toolTipElements.forEach(elem => {
		elem.addEventListener('mouseenter', (e) => {
			showTooltip(e, elem, toolTipDiv)
		})
		elem.addEventListener('mouseleave', (e) => {
			hideTooltip(toolTipDiv)
		})
	})
}

export default displayTooltips;