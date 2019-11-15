import os
from biplist import *

def getImageNames(imgDir):
	names = []
	for folder, subfolders, files in os.walk(imgDir):
		for file in files:
			if file.endswith('.png'):
				names.append(file)

	return names

def getData():
	curDir = os.path.abspath(os.path.dirname(__file__))
	plistPath = os.path.join(curDir, 'data.plist')

	dataDic = {}
	if os.path.exists(plistPath):
		try:
			dataDic = readPlist(plistPath)
		except Exception as e:
		    print(e)

	imgDir = os.path.join(curDir, 'static', 'images')
	names = getImageNames(imgDir)

	for name in names:
		if name not in dataDic:
			dataDic[name] = {}

	writeToFile(dataDic)
	return dataDic

def writeToFile(dic):
	curDir = os.path.abspath(os.path.dirname(__file__))
	plistPath = os.path.join(curDir, 'data.plist')
	try:
	    writePlist(dic,plistPath)
	except Exception as e:
	    print(e)

if __name__ == '__main__':
	getData()
