#!/bin/bash
###Author: Rodrigo Morales
###execute testingStudy
###output: (in the directory several files)

(java -jar  ./RefactoringStandarStudyAndroid.jar RefactoringStandarStudyAndroid.prop >output.txt 2>&1) &
Myjar_PID=$!
hostname>>pid.txt
echo "PID:" $Myjar_PID
echo "PID:" $Myjar_PID >> pid.txt
