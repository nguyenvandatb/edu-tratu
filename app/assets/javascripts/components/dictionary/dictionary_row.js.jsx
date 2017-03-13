var DictionaryRow = React.createClass({
  getInitialState: function(){
    return ( {id: this.props.id, category_id: this.props.category_id,
      category_name: this.props.category_name, name: this.props.name,
      description: this.props.description, edit: false, formErrors: {}} )
  },
  editDictionary: function(e){
    e.preventDefault();
    this.setState({edit: true});
  },
  cancelEdit: function(e){
    e.preventDefault();
    this.setState({edit: false, name: this.props.name, description: this.props.description, formErrors: {}});
  },
  handleCategoryChange: function(e) {
    this.setState({category_id: e.target.value});
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
  updateDictionary: function(e){
    e.preventDefault();
    this.props.parentUpdateDictionary(
      {dictionary: {id: this.state.id, category_id: this.state.category_id,
        name: this.state.name, description: this.state.description}},
      this.handleUpdate,
      this.handleValidationErrors
    );
  },
  deleteDictionary: function(e) {
    e.preventDefault();
    this.props.parentDeleteDictionary({id: this.state.id});
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
  renderDictionaryCategoryEditFields: function(){
    return(
      <div className= {"form-group"}>
        <select className="form-control" name="dictionary[category_id]"
          onChange={this.handleCategoryChange}>
            {this.props.categories.map(this.makeCategorySelection)}
        </select>
      </div>
    );
  },
  renderDictionaryNameEditFields: function(){
    var formGroupClass = this.state.formErrors["name"] ? "form-group has-error" : "form-group"
    return(
      <div className= {formGroupClass}>
        <input
          name="dictionary[name]"
          type="string"
          placeholder="Dictionary Name"
          value={this.state.name}
          onChange={this.handleNameChange}
          className="string form-control"
        />
        {this.renderFieldErrors("name")}
      </div>
    );
  },
  renderDictionaryDescriptionEditFields: function(){
    var formGroupClass = this.state.formErrors["description"] ? "form-group has-error" : "form-group"
    return(
      <div className= {formGroupClass}>
        <textarea
          name="dictionary[description]"
          placeholder="Dictionary Description"
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
            <a href="/categories">{this.props.category_name}</a>
          </td>
          <td>
            <a href={"/words?dictionary_id=" + this.state.id}>{this.props.name}</a>
          </td>
          <td className="col-sm-4">
            {this.props.description}
          </td>
          <td>{this.props.word_count}</td>
          <td>
            <a href="#" className='btn btn-info btn-round' onClick={this.editDictionary}>
              <i className="fa fa-pencil"></i>
            </a>
            <a href="#" className='btn btn-danger btn-round' onClick={this.deleteDictionary}>
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
            {this.renderDictionaryCategoryEditFields()}
          </td>
          <td>
            {this.renderDictionaryNameEditFields()}
          </td>
          <td>
            {this.renderDictionaryDescriptionEditFields()}
          </td>
          <td>{this.props.word_count}</td>
          <td className="col-sm-2">
            <button className='btn btn-success' onClick={this.updateDictionary}>Submit</button>
            <button className='btn btn-sm btn-primary' onClick={this.cancelEdit}>
              Cancel
            </button>
          </td>
        </tr>
      );
    }
  }
});
