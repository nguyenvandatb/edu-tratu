var CategoryRow = React.createClass({
  getInitialState: function(){
    return ( {id: this.props.id, name: this.props.name,
      description: this.props.description, edit: false, formErrors: {}} )
  },
  editCategory: function(e){
    e.preventDefault();
    this.setState({edit: true});
  },
  cancelEdit: function(e){
    e.preventDefault();
    this.setState({edit: false, name: this.props.name, description: this.props.description, formErrors: {}});
  },
  handleNameChange: function(e){
    this.setState({name: e.target.value});
  },
  handleDescriptionChange: function(e){
    this.setState({description: e.target.value});
  },
  handleValidationErrors: function(formErrorObject){
    this.setState({edit: true, formErrors: formErrorObject});
  },
  handleUpdate: function(){
    this.setState({edit: false, formErrors: false});
  },
  updateCategory: function(e){
    e.preventDefault();
    this.props.parentUpdateCategory(
      {category: {id: this.state.id, name: this.state.name,
        description: this.state.description}},
      this.handleUpdate,
      this.handleValidationErrors
    );
  },
  deleteCategory: function(e) {
    e.preventDefault();
    this.props.parentDeleteCategory({id: this.state.id});
  },
  renderFieldErrors: function(attribute){
    if(this.state.formErrors[attribute]){
      return(
        this.state.formErrors[attribute].map(function(error, i){
          return(
            <span key={i} className="help-block">
              {error}
            </span>
          );
        })
      );
    } else{
      return "";
    }
  },
  makeCategorySelection: function(category) {
    if (this.state.category_id == category.id) {
      return <option value={category.id} selected>{category.name}</option>;
    } else {
      return <option value={category.id}>{category.name}</option>;
    }
  },
  renderCategoryNameEditFields: function(){
    var formGroupClass = this.state.formErrors["name"] ? "form-group has-error" : "form-group"
    return(
      <div className= {formGroupClass}>
        <input
          name="category[name]"
          type="string"
          placeholder="Category Name"
          value={this.state.name}
          onChange={this.handleNameChange}
          className="string form-control"
        />
        {this.renderFieldErrors("name")}
      </div>
    );
  },
  renderCategoryDescriptionEditFields: function(){
    var formGroupClass = this.state.formErrors["description"] ? "form-group has-error" : "form-group"
    return(
      <div className= {formGroupClass}>
        <textarea
          name="category[description]"
          placeholder="Category Description"
          value={this.state.description}
          onChange={this.handleDescriptionChange}
          className="text form-control"
        />
        {this.renderFieldErrors("description")}
      </div>
    );
  },
  render: function() {
    if(this.state.edit == false){
      return(
        <tr className="dic_row">
          <td>{this.props.index + 1}</td>
          <td>
            {this.props.name}
          </td>
          <td>
            {this.props.description}
          </td>
          <td>{this.props.dictionary_count}</td>
          <td>
            <a href="#" className='btn btn-info btn-round' onClick={this.editCategory}>
              <i className="fa fa-pencil"></i>
            </a>
            <a href="#" className='btn btn-danger btn-round' onClick={this.deleteCategory}>
              <i className="fa fa-trash-o"></i>
            </a>
          </td>
        </tr>
      );
    } else{
      return(
        <tr className="dic_edit_form_row">
          <td>{this.props.index + 1}</td>
          <td>
            {this.renderCategoryNameEditFields()}
          </td>
          <td>
            {this.renderCategoryDescriptionEditFields()}
          </td>
          <td>{this.props.dictionary_count}</td>
          <td className="col-sm-2">
            <button className='btn btn-success' onClick={this.updateCategory}>Submit</button>
            <button className='btn btn-sm btn-primary' onClick={this.cancelEdit}>
              Cancel
            </button>
          </td>
        </tr>
      );
    }
  }
});
