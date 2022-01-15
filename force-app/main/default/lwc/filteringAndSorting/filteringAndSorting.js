import { LightningElement,wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactControler.getContactList'
export default class FilteringAndSorting extends LightningElement {
    headings =["Id","Name", "Title","Email"]
    fullTableData =[]
    filteredData =[]
    timer


    @wire(getContactList)
    contactHandler({data,error}){
       if(data){ console.log(data)
        this.fullTableData = data
        this.filteredData =data
        }
       if (error){
           console.error(error)
       }
    }
    
    filterHandler(event){
        const {value} = event.target
 
        if(value){
            window.clearTimeout(this.timer)
                   //console.log(value)
            this.timer = window.setTimeout(()=>{ // putting some bouncing
                this.filteredData = this.fullTableData.filter(eachObj=>{
                    return Object.keys(eachObj).some(key=>{
                        return eachObj[key].toLowerCase().includes(value)
                    })
                })
            },500)
        }
        else {
                this.filteredData = [...this.fullTableData]
        }
       
    }
}