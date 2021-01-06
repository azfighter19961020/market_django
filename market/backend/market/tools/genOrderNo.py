def generateOrderNo(uuidString):
	import random
	alphaList = [chr(i).lower() for i in range(65,91)]
	alphaDict = {}
	random.seed(10)
	alphaInitial = (len(alphaList) + random.randint(0,len(alphaList) * 2000))
	for i,j in zip(range(alphaInitial,alphaInitial + len(alphaList) + 1),alphaList):
		alphaDict[j] = i
	number = 0
	for element in uuidString:
		if element == "-":
			number += 5
		elif element.isalpha():
			if element.islower():
				number += alphaDict[element]
			else:
				number += alphaDict[element.lower()] + 15
		elif element.isdigit():
			number += int(element) * 10
	return str(number).zfill(10)
