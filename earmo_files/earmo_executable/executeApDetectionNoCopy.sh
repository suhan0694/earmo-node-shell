#!/bin/bash
###Rodrigo Morales
###This scripts copy the RefactoringStandarStudyAndroid to the project folder, update the path
###of the project binaries, and execute the script with the experiment

for dir in `find $PWD -mindepth 1 -maxdepth 1 -type d`;
 do
	cd $dir
	echo "$PWD"
	if [ -f "testingStudy.sh" ]; then	
		cp -f ~/repositoryMetaheur/jars/RefactoringStudyAndroid/RefactoringStandarStudyAndroid.jar .
	#Execute the metaheuristic
		path="$PWD"/bin/classes/
		sed -i "s|pathProjecttoAnalize.*|pathProjecttoAnalize="$path"|g" RefactoringStandarStudyAndroid.prop
		otroPath="$PWD"/ResultsTesting/
		sed -i "s|outputDirectory.*|outputDirectory="$otroPath"|g" RefactoringStandarStudyAndroid.prop
		./testingStudy.sh

	fi
done
