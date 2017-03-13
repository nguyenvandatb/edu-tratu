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
            word_count={dictionary.word_count}
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
                <th>Word Count</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.props.dictionaries && this.props.dictionaries.length > 0 ?
                this.renderDictionaryRows() : null}
            </tbody>
          </table>
          {this.props.dictionaries == null || this.props.dictionaries.length == 0 ?
            noDictionary : null}
        </div>
      </div>
    );
  }
});
