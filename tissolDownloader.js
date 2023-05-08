// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://tissol.tiss.edu/course/view.php?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        GM_xmlhttpRequest
// @grant        GM_download
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @require      https://cdn.jsdelivr.net/npm/d3@6.7.0/dist/d3.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.min.js

// ==/UserScript==
(async function() {
    'use strict';
//     async function down(url){
//                console.log('Waiting');
//                console.log(url);
//                a = await fetch(url);
//                return a
//            };
//    import {PDFDocument} from 'pdf-lib';
//    var moduleName = 'pdf-js';
//    require([moduleName], function(fooModule){
//        console.log(fooModule)
//    })
//    const PDFDocument = PDFlib.PDFDocument;
//    console.log(PDFlib)
//    const pdfjsLib = require(['pdfjs-dist/legacy/build/pdf.js']);

//    const pdfkitScript = 'https://cdnjs.cloudflare.com/ajax/libs/pdfkit/0.11.0/pdfkit.min.js';
/*
    function loadPdfKit(callback) {
        if (typeof pdfkit !== 'undefined') {
            callback();
        } else {
            GM_xmlhttpRequest({
                method: 'GET',
                url: pdfkitScript,
                onload: function(response) {
                    const script = document.createElement('script');
                    script.textContent = response.responseText;
                    document.head.appendChild(script);
                    callback();
                }
            });
        }
    }
*/
//    window.loadPdfKit = loadPdfKit;
//    const pdfjsLib = require(["pdfjs-dist"]);
//    console.log(pdfjsLib)
//    pdfjsLib.GlobalWorkerOptions.workerSrc = require(["pdfjs-dist/build/pdf.worker"]);
//    const pdfjsLib = window['pdfjs-dist/build/pdf'];

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js';



    let a = document.getElementsByClassName('iconlarge activityicon');
    let navBar = document.getElementsByClassName('fixed-top navbar navbar-light bg-white navbar-expand moodle-has-zindex');
    console.log(navBar[0].childNodes)
    let progressBarDiv = document.createElement('ul');
    let progressBar = document.createElement('li');
    progressBar.id = 'progress-bar';
    progressBarDiv.style.width = '10%';
    progressBarDiv.style.listStyleType = 'none';
    progressBarDiv.appendChild(progressBar)
    let progressBarDivFetch = document.createElement('div');
    progressBarDivFetch.id = 'progress-bar-fetch-status';
    let progressBarDivFetchDiv = document.createElement('div');
    progressBarDivFetchDiv.id = 'progress-bar-fetch-bar';
    let progressBarDivDownload = document.createElement('div');
    progressBarDivDownload.id = 'progress-bar-download-status';
    let progressBarDivDownloadDiv = document.createElement('div');
    progressBarDivDownloadDiv.id = 'progress-bar-download-bar';
    progressBar.appendChild(progressBarDivFetch);
    progressBar.appendChild(progressBarDivDownload);
    progressBarDivFetch.appendChild(progressBarDivFetchDiv);
    progressBarDivDownload.appendChild(progressBarDivDownloadDiv);
    navBar[0].insertBefore(progressBarDiv,navBar[0].childNodes[8]);
    progressBarDivFetch.style.width = '20em';
    progressBarDivFetch.style.height = '1em';
    progressBarDivFetch.style.backgroundColor = '#dddddd';
    progressBarDivDownload.style.width = '20em';
    progressBarDivDownload.style.height = '1em';
    progressBarDivDownload.style.backgroundColor = '#dddddd';
    progressBarDivFetchDiv.style.width = '0em';
    progressBarDivFetchDiv.style.height = '100%';
    progressBarDivFetchDiv.style.backgroundColor = '#4CAF50';
    progressBarDivDownloadDiv.style.width = '0em';
    progressBarDivDownloadDiv.style.height = '100%';
    progressBarDivDownloadDiv.style.backgroundColor = '#4CAF50';

    console.log(navBar);
    console.log(progressBar);
    console.log(a);
    console.log(pdfjsLib);

    //var pages = prompt('What is your reading speed (Pages per hour)?');
    //var hours = prompt('How many hours are you going to study per day');
    //var days = prompt('How many days do you plan on studying?');


    let b=[];
    let response=[];
    let count=0;
    var csv = 'Name,Pages\n';
    var url_lis = []
    async function getting_url(){
        var fetchBar = document.getElementById('progress-bar-fetch-bar');
        console.log(fetchBar);
        fetchBar.style.width='0em';
        async function fetchWithTimeout(resource, options = {}) {
            const { timeout = 8000 } = options;

            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), timeout);

            const response = await fetch(resource, {
                ...options,
                signal: controller.signal
            });
            clearTimeout(id);

            return response;
        }

        for (let i=0;i<(a.length);i++)
        {

            console.log('Hi')
            if (a[i].src.includes('pdf','document')){
                b.push(a[i].parentElement);
                console.log(b);
                console.log(count);
                ///            const data = (async () => {
                //                return await fetch(b[count].href);
                //            })
                console.log('Hi');
                //let data = fetch(b[count].href);
                console.log('Waiting')
                let data = await fetch(b[count].href);
                console.log('Done')
                response.push(data);
                console.log('Data',data)
                //            download_file.href = response[count].url;
                //            download_file.download=response[count].url;
                //            download_file.target = '_blank';
                //            console.log(download_file)
                //            download_file.click();
                count+=1
                fetchBar.style.width = ((i/a.length)*11)+'em';
                console.log(fetchBar.style.width);
            }
        }
        console.log(response)
        for(let i=0;i<response.length;i++){
            url_lis.push(response[i].url)
        }
        console.log(url_lis);
        return url_lis;
    }




    /*

    function createZipFile(files) {
        const zip = new JSZip();
        files.forEach(file => {
            zip.file(file.name, file.data);
        });
        return zip.generateAsync({ type: 'blob' });
    }
    // Function to download a file using Tampermonkey's GM_download function
    function downloadFile(filename, data) {
        const blob = new Blob([data], { type: 'application/zip' });
        GM_download({
            url: URL.createObjectURL(blob),
            name: filename,
            saveAs: true
        });
        console.log('creating blob')
    }

    // Function to download all the PDFs and create a ZIP file from them
    function downloadPdfFiles() {
        console.log('inside');
        const fileDataPromises = url_lis.map(url => {
            return new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: url,
                    responseType: 'arraybuffer',
                    onload: response => {
                        const data = new Uint8Array(response.response);
                        const name = url.split('/').pop();
                        resolve({ name, data });
                    },
                    onerror: error => {
                        console.log(error);
                    }
                });
            });
            console.log('Getting file data')
        });

        Promise.all(fileDataPromises)
            .then(files => {
                return createZipFile(files);
            })
            .then(zipData => {
                const filename = 'pdfs.zip';
                downloadFile(filename, zipData);
                console.log('File Downloaded');
            })
            .catch(error => {
                console.error(error);
                alert('An error occurred while downloading the PDFs');
            });
    }

    // Add a button to the page to download the PDFs
    const downloadButton = document.createElement('button');
    console.log(downloadButton)
    downloadButton.innerText = 'Download PDFs';
    downloadButton.addEventListener('click', downloadPdfFiles);
    downloadButton.click();

    */



    /*
    function saveZip(filename, urls){
        console.log('Url Passed',urls)
        if(!urls) return;
        function fetchURL(url_passed) {
            return fetch(url_passed)
        }
        const zip = new JSZip();
        const folder = zip.folder("files"); // folder name where all files will be placed in
        async function urls_blobs() {
            await urls.forEach((url) => {
                console.log(url)
                const blobPromise = fetchURL(url).then((r) => {
                    console.log('Blob',r)
                    console.log('Url',url)
                    if (r.status === 200) {
                        if (r instanceof Blob){
                            console.log('Error Url',url)
                        }
                        else {
                            try {
                                var blb= r.blob()
                                console.log(blb);
                                let reader = new FileReader();
                                var blbr = new Blob([JSON.stringify(r)],{type:'application/json'})
                                reader.readAsText(blbr);
                                console.log('Response',r)
                                console.log('Blob reader',blbr)
                                reader.onload = function() {
                                    console.log('reader',reader.result);
                                };
                                return blb;
                            }
                            catch {
                                console.log('Error URL',url)
                            }
                        }


                    }
                    else {
                        console.log('Error URL',url);
                        return new ArrayBuffer();
                    }
                    console.log(r.statusText);
                    return Promise.reject(new Error(r.statusText));
                });
                const name = url.substring(url.lastIndexOf("/") + 1);
                folder.file(name, blobPromise);
                console.log('folder',folder)
            });

        }

*/


    function saveZip(filename, urls){
        var j = 0;
        //urls = urls.slice(1,5)
        var downloadBar = document.getElementById('progress-bar-download-bar');
        downloadBar.style.width = '0em';

        function generate_Zip() {

            zip.generateAsync({ type: "blob" }).then((blob) => {
                console.log('Insidde');
                const download_zip = document.createElement('a');
                console.log('created',download_zip);
                download_zip.href = URL.createObjectURL(blob);
                console.log('updated',download_zip);
                download_zip.dowload = URL.createObjectURL(blob);
                console.log('updated',download_zip);
                download_zip.target = '_blank';
                console.log('updated',download_zip);
                download_zip.click();
                console.log('Clicked');
            })

            console.log('generate Zip');

            return true
        }
        function csvSaver(){
            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
            hiddenElement.target = '_blank';
            hiddenElement.download = 'Number of Pages';
            hiddenElement.click();
            console.log('Hidden Element CLicked')
        };
        console.log('Url Passed',urls)
        if(!urls) return;
        const zip = new JSZip();
        const folder = zip.folder("files"); // folder name where all files will be placed in
        async function urls_blobs() {
            await urls.forEach((url) => {
                console.log(url)
                function onreadystatechange (request){
                    if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                        var data = request.response
                        console.log('Blob ready state',data);
                        try {
                            var blb= data
                            console.log(blb);
                            let reader = new FileReader();
                            reader.readAsText(blb);
                            reader.onload = function() {
                                console.log('reader ready');
                            };
                            const name = url.substring(url.lastIndexOf("/") + 1);
                            folder.file(name, blb);
                            console.log('folder',folder)

                            console.log('j',j)
                            var reader3 = new FileReader();
                            reader3.readAsDataURL(blb);
                            reader3.onload = function() {
                                var base64data = reader3.result;
                                var raw = atob( base64data.substr(base64data.indexOf(',')+1));
                                var uint8Array = new Uint8Array(raw.length);
                                for (var i = 0; i < raw.length; i++) {
                                    uint8Array[i] = raw.charCodeAt(i);
                                }
                                pdfjsLib.getDocument(uint8Array).promise.then(function (pdf) {
                                    j+=1
                                    downloadBar.style.width = ((j/urls.length)*11)+'em';
                                    console.log(pdf);
                                    console.log('Pages',pdf.numPages);
                                    let row = [name,pdf.numPages]
                                    csv += row.join(',');
                                    csv += "\n";
                                    if (j==urls.length) {
                                        generate_Zip();
                                        csvSaver()
                                    }
                                    })
                            }
                        }
                        catch(e) {
                            console.log('Error',e)
                        }
                    }
                }
                /*
                const onload = (res) => {
                    var r = response;
                    console.log('Blob',r)
                    console.log('Url',url)
                    if (r.status === 200) {
                        try {
                            var blb= r
                            console.log(blb);
                            let reader = new FileReader();
                            reader.readAsText(blb);
                            reader.onload = function() {
                                console.log('reader',reader.result);
                            };
                            const name = url.substring(url.lastIndexOf("/") + 1);
                            folder.file(name, blb);
                            console.log('folder',folder)
                        }
                        catch(e) {
                            console.log('Error',e)
                        }


                    }
                    else {
                        console.log('Blob',r);
                    }
                    console.log(r.statusText);
                }
                */
                try{
                    var xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = () => onreadystatechange(xhr);
                    xhr.open('GET', url, true);
                    xhr.responseType = 'blob';
                    xhr.send();
                }
                catch{
                    console.log('GM url error', url)
                }


            });

        };
        urls_blobs()
        //    zip.generateAsync({ type: "blob" }).then((blob) => saveAs(blob, filename));
        };
    getting_url().then((url_lis) => saveZip("Test.zip", url_lis));

})();
