import React from 'react'

 class SearchBar extends React.Component {

   

    handleFormSubmit = (event) => {

        //preventDefault varsayılan hareketi engeller
        event.preventDefault();
    }

    render() {

        

        return (
            <div>
               <form onSubmit={this.handleFormSubmit} className='form-row mb-5 mt-3'>
                   <div className='col-12'>
                       <input onChange={this.props.searchMovieProp}
                        type='text' className='form-control' 
                        placeholder='Search a Movie'
                        
                        />
                   </div>

               </form>
                
            </div>
        )
    }
}

export default SearchBar;
