# TISSOL Downloader

## About

Tissol Downloader was built to make it easier to manage the documents on the course pages. It zips all the PDF files on the page and downloads it. Additionally it also downloads a csv file which has the number of pages in each PDF file. The motive was to allow students to get an overview of the course workload without having to go through the task of viewing each PDF separately. More features are on the way  

## Setup

TISSOL Downloader works as a javascript code which can be injected into the course page by using plugins like Tampermonkey, Greasemonkey and other. Currently the code works perfectly on Chrome browser(Tampermonkey). 

 - Add Tampermonkey to Chrome - https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en
 - Download the user script 'tissolDownloader.js' from - https://github.com/schrodinger-lab/TissolDownloader 
 - In the Tampermonkey plugin click on Dashboard -> Utilities -> Import from file. 
 - In Dashboard enable the script.
 - Visit any course page and it will start downloading the PDF.

## Newer versions on the way

 - Currently TISSOL Downloader only handles PDF files. It does not work for files inside a folder or there may be some course pages where the download may fail. This will be resolved in the upcoming versions.
 - Depending on the size of the files the download may be delayed. This will also be taken care of further. 
