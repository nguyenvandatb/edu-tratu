var DictionaryTable = React.createClass({
  renderDictionaryRows: function(){
    return (
      this.props.dictionaries.map(function(dictionary, index){
        return(
          <DictionaryRow
            key={dictionary.id}
            id={dictionary.id}
            categories={this.props.categories}
            category_id={dictionary.category.id}
            category_name ={dictionary.category.name}
            name={dictionary.name}
            description={dictionary.description}
            parentUpdateDictionary={this.props.parentUpdateDictionary}
            parentDeleteDictionary={this.props.parentDeleteDictionary}
            index={index}/>
        );
      }.bind(this))
    );
  },
  render: function() {
    var noDictionary = (
      <div className="alert alert-warning">No dictionary</div>
    )
    return(
      <div className='row'>
        <div className='table-responsive'>
          <table  className='table table-hover table-bordered'>
            <thead className="dic_head">
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.renderDictionaryRows()}
            </tbody>
          </table>
          {this.props.dictionaries.length == 0 ? noDictionary : null}
        </div>
      </div>
    );
  }
});
