//  Citation Text Converter converts BibTex, DOI, Wikidata formats into the Citation text format. 
//  Highly useful for researchers to give citations of other research work in their manuscript.

const Cite = require('citation-js')
let date = (new Date()).toLocaleDateString()

function formatName(name){
  let authorNames = ", "
    name[0].author.forEach((value) => {
      authorNames+=(`${value['given']} ${value['family']} , `);
    })
    return (`${authorNames}`)

}

function customizedPlugin(data){
    // returns the data in the custom template.
    return `${data[0].title} ${formatName(data)} ${data[0].URL}}`
}

function citationText(data, customized = undefined) {

  // Input Data formats: DOI, Wikidata, BibJSON, CSLJSON
  const inputData = new Cite(data) 

  // Output Data Formats: bibtex, bibtxt, citation, bibliography, label, ris, data(json)

  // If using customized format Plugin
  if(typeof customized !== 'undefined'){
    const output = customized(inputData.data)
    return output // return cutomized citation text
  }

  // Else using default
  else{
    let output = inputData.format('bibliography', {
      type: 'string', // other type options: json, html, string
      format: 'text', // other format options: text, html
      template: 'apa', // other CSL templates: vancouver, harvard1 (also external plugins can be used for customized styling)
      lang: 'en-US', // other CSL Locales : es-ES , de-DE, fr-FR, nl-NL
      prepend() {
        return `Information fetched:  ` // prepends custom text
      },
      append:` [Retrieved on ${date}]` // appends current date
    })
    return output // return citation text

  }
  
  
}

// 1: Parsing the Data from Wikidata format and with output in custom template
console.log(citationText(`Q30000000`, customizedPlugin))

// 2: Parsing the Data from BibTex Format
console.log(citationText(`@article{woo2008robotic,
  title={A robotic system for road lane painting},
  author={Woo, Sangkyun and Hong, Daehie and Lee, Woo-Chang and Chung, Jae-Hun and Kim, Tae-Hyung},
  journal={Automation in Construction},
   volume={17},
   number={2},
   pages={122--129},
   year={2008},
   publisher={Elsevier}
 }`))

 // 3: Parsing the Data from DOI format
console.log(citationText('https://doi.org/10.3390/robotics8010010'))

