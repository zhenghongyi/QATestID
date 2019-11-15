var serverIP = '192.168.200.29' // 当前电脑ip地址

function request(option) {
	  if (String(option) !== '[object Object]') return undefined
	  option.method = option.method ? option.method.toUpperCase() : 'GET'
	  option.data = option.data || {}
	  var formData = []

	  
	  var url = option.url

	  if (option.method == 'POST') {
	  	var data = JSON.stringify(option.data);
	  	option.data = data
	  }

	  if (option.method === 'GET') {
	  	for (var key in option.data) {
	  		formData.push(''.concat(key, '=', option.data[key]))
	  	}
	  	option.data = formData.join('&')

	  	if (location.search.length > 0) {
	  		// option.url += ''.concat('?', option.data)
	  		url += ''.concat('?', option.data)
	  	}
	  }

	  option.url = 'http://' + serverIP + ':5000/' + url

	  var xhr = new XMLHttpRequest()
	  xhr.responseType = option.responseType || 'json'
	  xhr.onreadystatechange = function () {
	    if (xhr.readyState === 4) {
	      if (xhr.status === 200) {
	        if (option.success && typeof option.success === 'function') {
	          option.success(xhr.response)
	        }
	      } else {
	        if (option.error && typeof option.error === 'function') {
	          option.error()
	        }
	      }
	    }
	  }
	  xhr.open(option.method, option.url, true)
	  if (option.method === 'POST') {
	    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
	    console.log(option.data)
	  }
	  xhr.send(option.method === 'POST' ? option.data : null)
}
