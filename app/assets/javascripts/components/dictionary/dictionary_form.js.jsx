var NewDictionaryForm = React.createClass({
  getInitialState: function(){
    return {
      category_id: this.props.categories.length > 0 ? this.props.categories[0].id : null,
      name: '',
      description: '',
      is_new_category: this.props.categories.length > 0 ? false : true,
      success: false,
      category_name: '',
      category_description: '',
      formErrors: {}
    };
  },
  componentDidMount(){
     $(ReactDOM.findDOMNode(this)).modal('show');
     $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideModal);
  },
  resetState: function(){
    this.setState({category_id: this.props.categories[0].id, name: "", description: "",
      is_new_category: false, success: true, category_name: '', category_description: '', formErrors: {}});
  },
  handleValidationError: function(formErrorObj){
    this.setState({formErrors: formErrorObj, success: false});
  },
  newDictionarySubmit: function(e){
    e.preventDefault();
    if (this.state.is_new_category) {
      var formData = {category: {name: this.state.category_name,
        description: this.state.category_description,
        dictionaries_attributes: [{name: this.state.name,
        description: this.state.description, user_id: this.props.user_id}]}};
      var url = '/categories';
    } else {
      var formData = {dictionary: {category_id: this.state.category_id, name: this.state.name,
        description: this.state.description}}
      var url = '/dictionaries';
    }
    this.props.parentDictionarySubmit(
      url,
      formData,
      this.resetState,
      this.handleValidationError
    );
  },
  handleNewCategory: function(e){
    this.setState({is_new_category: !this.state.is_new_category})
  },
  handleCategoryChange: function(e) {
    this.setState({category_id: e.target.value});
  },
  handleCategoryNameChange: function(e) {
    this.setState({category_name: e.target.value});
  },
  handleCategoryDescriptionChange: function(e) {
    this.setState({category_description: e.target.value});
  },
  handleNameChange: function(e){
    this.setState({name: e.target.value});
  },
  handleDescriptionChange: function(e){
    this.setState({description: e.target.value});
  },
  renderFieldErrors: function(attribute, isDictionary){
    if (this.state.is_new_category && isDictionary) {
      if (this.state.formErrors["dictionaries." + attribute]) {
        return(
          this.state.formErrors["dictionaries." + attribute].map(function(error, i){
            return(
              <span key={i} className="help-block">
                {error}
              </span>
            );
          })
        );
      } else {
        return "";
      }
    } else if (this.state.formErrors[attribute]){
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
    return <option value={category.id} key={category.id}>{category.name}</option>;
  },
  renderDictionaryCategoryFields: function(){
    if (this.state.is_new_category) {
      var categoryLink = (
        <a className='btn btn-sm btn-danger' onClick={this.handleNewCategory}>
          Close?
        </a>
      )
      var formGroupClass = this.state.formErrors["name"] ?
        "form-group has-error" : "form-group";
      var categoryType = [<input
                        name="category[name]"
                        type="string"
                        placeholder="Category Name"
                        value={this.state.category_name}
                        onChange={this.handleCategoryNameChange}
                        className="string form-control"
                      />,
      this.renderFieldErrors("name", false)]
    } else {
      var categoryLink = (
        <a className='btn btn-sm btn-primary' onClick={this.handleNewCategory}>
          New Category
        </a>
      )
      var categoryType = (
        <select className="form-control" name="dictionary[category_id]"
          value={this.state.category_id} onChange={this.handleCategoryChange}>
            {this.props.categories.map(this.makeCategorySelection)}
        </select>
      )
      var formGroupClass = "form-group";
    }
    var hasCategory = (
      <div className='row'>
        <div className='col-sm-9'>
          <div className= {formGroupClass}>
            {categoryType}
          </div>
        </div>,
        <div className='col-sm-2'>
          {categoryLink}
        </div>
      </div>
    )
    var noCategory = (
      <div className= {formGroupClass}>
        {categoryType}
      </div>
    )
    return(
      this.props.categories.length > 0 ? hasCategory : noCategory
    );
  },
  renderCategoryDescriptionField: function(){
    if (this.state.is_new_category) {
      var formGroupClass = this.state.formErrors["description"] ?
        "form-group has-error" : "form-group"
      return(
        <div className= {formGroupClass}>
          <input
            name="category[description]"
            type="string"
            placeholder="Category Description"
            value={this.state.category_description}
            onChange={this.handleCategoryDescriptionChange}
            className="string form-control" />
          {this.renderFieldErrors("description", false)}
        </div>
      );
    } else {
      return("");
    }
  },
  renderDictionaryNameField: function(){
    if (this.state.is_new_category) {
      var formGroupClass = this.state.formErrors["dictionaries.name"] ?
      "form-group has-error" : "form-group";
    } else {
      var formGroupClass = this.state.formErrors["name"] ?
      "form-group has-error" : "form-group";
    }
    return(
      <div className={formGroupClass}>
        <input
          name="dictionary[name]"
          type="string"
          placeholder="Dictionary Name"
          value={this.state.name}
          onChange={this.handleNameChange}
          className="string form-control"
        />
        {this.renderFieldErrors("name", true)}
      </div>
    );
  },
  renderDictionaryDescriptionField: function(){
    if (this.state.is_new_category) {
      var formGroupClass = this.state.formErrors["dictionaries.description"] ?
        "form-group has-error" : "form-group";
    } else {
      var formGroupClass = this.state.formErrors["description"] ?
        "form-group has-error" : "form-group";
    }

    return(
      <div className={formGroupClass}>
        <textarea
          name="dictionary[description]"
          placeholder="Dictionary Description"
          value={this.state.description}
          onChange={this.handleDescriptionChange}
          className="text form-control"
        />
        {this.renderFieldErrors("description", true)}
      </div>
    );
  },
  render: function() {
    let fieldSuccess = (
      <div className='alert alert-success'>
          Create dictionary successfully!
      </div>
    )
    return(
      <div className='modal fade'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'
                aria-label='Close'><span aria-hidden='true'>&times;</span></button>
              <h3>Add Dictionary</h3>
            </div>
            <div className='modal-body'>
              {this.state.success ? fieldSuccess : null}
              <form className= 'form_body' onSubmit={this.newDictionarySubmit}>
                <div className='form-inputs'/>
                  {this.renderDictionaryCategoryFields()}
                  {this.renderCategoryDescriptionField()}
                  {this.renderDictionaryNameField()}
                  {this.renderDictionaryDescriptionField()}
                  <div className='row'>
                    <div className='col-sm-4'>
                      <input type="submit" value="Save" className='btn btn-primary' />
                    </div>
                  </div>
              </form>
            </div>
            <div className='modal-footer'>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
