var CategoryTable = React.createClass({
  renderCategoryRows: function(){
    return (
      this.props.categories.map(function(category, index){
        return(
          <CategoryRow
            key={category.id}
            id={category.id}
            name={category.name}
            description={category.description}
            index={index}
            dictionary_count={category.dictionary_count}
            parentUpdateCategory={this.props.parentUpdateCategory}
            parentDeleteCategory={this.props.parentDeleteCategory} />
        );
      }.bind(this))
    );
  },
  hasCategory() {
    return this.props.categories != null && this.props.categories.length > 0;
  },
  render: function() {
    var noCategory = (
      <div className="alert alert-warning">No category</div>
    )
    return(
      <div className='row'>
        <div className='table-responsive'>
          <table  className='table table-hover table-bordered'>
            <thead className="dic_head">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Dictionary Count</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.hasCategory() ? this.renderCategoryRows() : null}
            </tbody>
          </table>
          {this.hasCategory() ? null : noCategory}
        </div>
      </div>
    );
  }
});
