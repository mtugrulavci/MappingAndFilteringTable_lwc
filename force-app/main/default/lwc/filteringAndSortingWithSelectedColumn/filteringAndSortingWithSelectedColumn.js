
import { LightningElement,wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactControler.getContactList'
export default class FilteringAndSortingWithSelectedColumn extends LightningElement {
    headings =["Id","Name", "Title","Email"]
    fullTableData =[]
    filteredData =[]
    timer
    filterBy ="Name"
    sortedBy ="Name"
    sortDirection ='asc'

    @wire(getContactList)
    contactHandler({data,error}){
       if(data){ console.log(data)
        this.fullTableData = data // store here so it would never change
        this.filteredData =[...this.sortBy(data)] // this is the manupilated data
        
        }
       if (error){
           console.error(error)
       }
    }
    get FilterByOptions(){
        return [
            {label:'All',value:'All'},
            {label:'Id',value:'Id'},
            {label:'Name',value:'Name'},
            {label:'Title',value:'Title'},
            {label:'Email',value:'Email'}
        ]
    }
    get SortByOptions(){
        return [
            {label:'Id',value:'Id'},
            {label:'Name',value:'Name'},
            {label:'Title',value:'Title'},
            {label:'Email',value:'Email'}
        ]
    }
    filterByHandler(event){
        this.filterBy =event.target.value
    }
    
    filterHandler(event){
        const {value} = event.target
        window.clearTimeout(this.timer)
        if(value){
                   //console.log(value)
            this.timer = window.setTimeout(()=>{ // putting some bouncing
            this.filteredData = this.fullTableData.filter(eachObj=>{
                    if(this.filterBy ==='All'){
                    //below logic will filter each and everyproperty of object
                        return Object.keys(eachObj).some(key=>{
                            return eachObj[key].toLowerCase().includes(value)
                          })  
                    } else{
                    
                        const val = eachObj[this.filterBy] ? eachObj[this.filterBy]:''
                        return val.toLowerCase().includes(value)
                    }
                })
            },500)
        }
        else {
                this.filteredData = [...this.fullTableData]  // if there is no data we are updating the data with full data
        }
       
    }
    /**** Sorting Logic here */
    sortHandler(event){
        this.sortedBy= event.target.value
        this.filteredData =[...this.sortBy(this.filteredData)]
    }
    sortBy(data){
        const cloneData = [...data]
        cloneData.sort((a,b)=>{
            if(a[this.sortedBy]=== b[this.sortedBy]){
                return 0
            }
            return this.sortDirection ==='desc' ? 
            a[this.sortedBy]> b[this.sortedBy]? -1:1 :
            a[this.sortedBy]< b[this.sortedBy]? -1:1
        })
        return cloneData
    }
}