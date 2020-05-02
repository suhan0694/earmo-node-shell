import csv
import os
import sys
antiPatternsList = list()
antiPatternsList.append("BindingResources2Early.ini")
antiPatternsList.append("Blob.ini")
antiPatternsList.append("HashMapUsageAndroid.ini")
antiPatternsList.append("InternalGetterAndSettersAndroid.ini")
antiPatternsList.append("LargeClassLowCohesion.ini")
antiPatternsList.append("LazyClass.ini")
antiPatternsList.append("LongParameterList.ini")
antiPatternsList.append("RefusedParentBequest.ini")
antiPatternsList.append("ReleasingResources2Late.ini")
antiPatternsList.append("SpaghettiCode.ini")
antiPatternsList.append("SpeculativeGenerality.ini")

appname = "mycontacts"
parameter=2
dict1 = dict()
dict1["appname"]=appname
print(os.getcwd())

def processFiles():
    for file in antiPatternsList:

        with open(os.getcwd() + "\\DetectionResults in  for " + file, 'r') as f:
            lines = f.read().splitlines()
            totalCount = 0
            entityLines = list()

            for line in lines:
                if "#----> Total:" in line:
                    totalCount = line
                    break
                # if "Entity name:" in line:
                #     entityLines.append(line)
            dict1[file.split(".")[0]] = totalCount.split(":")[1]
    file_exists = os.path.isfile(os.getcwd()+"\\"+str(parameter)+".csv")
    with open(str(parameter)+".csv", mode='a') as earmo_file:
        fieldnames = ['appname', 'BindingResources2Early', 'Blob',
                      'HashMapUsageAndroid', 'InternalGetterAndSettersAndroid',
                      'LargeClassLowCohesion', 'LazyClass', 'LongParameterList',
                      'RefusedParentBequest', 'ReleasingResources2Late',
                      'SpaghettiCode', 'SpeculativeGenerality']
        writer = csv.DictWriter(earmo_file, fieldnames=fieldnames)
        if not file_exists:
            writer.writeheader()
        writer.writerow(dict1)

def main():
    appname=sys.argv[0]
    processFiles()


if __name__ == "__main__":
    main()
