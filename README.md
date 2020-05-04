# earmo-node-shell
Node script to automate EARMO execution

Paste your APK in the root folder.

Open Terminal and run `npm run start`

Choose your OS (Not implemented, Works only on windows), Enter Independent Runs, EO value, your APK name.

Earmo will run in a folder named Output.
You can track the progress of the EARMO study in Output/earmo_exectuable/output.txt file.

To analyse your results follow the below steps:
The file process_results/processing.py has a variable called 'parameter'.

Enter your number of runs here.

Place the file in folder of the app that has results for n.
Run the file using python  as `python processing.py <appname>`
A file called n.csv gets created.

Open it and check if the record has been inserted properly.

Next, copy n.csv and processing.py to results of next app.

Run the file as described above.

TODO:
* Make the script work asynchronously using promises. ✔️
* Work on both Windows and Linux. ❌
* Call testingStudy.sh from script ✔️
* Tail the log file on the cmd window. ❌





Sources:
* https://github.com/moar82/EARMO/wiki
* https://github.com/pxb1988/dex2jar


