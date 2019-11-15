function getLineStr(fromX, fromY, toX, toY) {
	var lineStr = fromX.toString() + ',' + fromY.toString() + '-' + toX.toString() + ',' + toY.toString()
	return lineStr
}

function getPointStr(x, y) {
	var pointStr = x.toString() + ',' + y.toString()
	return pointStr
}

function getPageID() {
	var url = location.search
    if (url.indexOf("?") != -1) 
    {
        var str = url.substr(1)
        var pageComponent = str.split("&")[0]
        var imgName = pageComponent.split('=')[1]
        return imgName
    }
    return null
}

function position(str, isFrom, isX) {
    var xStr
    var yStr
    var components = str.split('-')
    if (isFrom) {
        var fromStr = components[0]
        xStr = fromStr.split(',')[0]
        yStr = fromStr.split(',')[1]
    } else {
        var toStr = components[1]
        xStr = toStr.split(',')[0]
        yStr = toStr.split(',')[1]
    }

    if (isX) {
        return parseFloat(xStr)
    } else {
        return parseFloat(yStr)
    }
}

function addTextMark(x, y, text) {
    var markText = document.createElement('input');
    markText.type = "text"
    markText.style.position = "absolute"
    markText.style.top = y + "px"
    markText.style.left = x - 60 + "px"
    markText.style.color = "red"
    markText.style.fontSize = "20px"
    markText.style.border = "none"
    markText.value = text

    var textDiv = document.getElementById("textMark")
    textDiv.appendChild(markText)

    return markText
}

function drawPointIn(canvasCtx, x, y) {
    canvasCtx.fillStyle = "#FF0000"
    canvasCtx.beginPath()
    canvasCtx.arc(x, y, 5, 0, Math.PI*2, true)
    canvasCtx.closePath()
    canvasCtx.fill()
}

function drawLineIn(canvasCtx, fromx, fromy, tox, toy) {
    canvasCtx.beginPath();
    canvasCtx.strokeStyle = "#FF0000"
    canvasCtx.moveTo(fromx, fromy)
    canvasCtx.lineTo(tox, toy)
    canvasCtx.stroke()
    canvasCtx.closePath()
}

function clearCanvas(canvasId) {
    var canvas = document.getElementById(canvasId)
    var cxt = canvas.getContext("2d")
    cxt.clearRect(0,0,canvas.width,canvas.height)
}


