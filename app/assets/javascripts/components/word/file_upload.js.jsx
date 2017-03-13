var FileUploadInput = React.createClass({
  getInitialState: function() {
    return { value: "", file: false, progress: null };
  },
  beginUpload: function() {
    if (!this.state.file) {
      return false;
    }
    var that = this;
    var formData = new FormData();
    var request = new XMLHttpRequest();

    formData.append("file", this.state.file);
    formData.append("dictionary_id", this.props.dictionary_id);
    request.onerror = function() {
      that.setState({error: true, result: "Upload failed."});
    };
    request.onreadystatechange = function() {
      if (this.readyState == 4) {
        that.setState({file: false, progress: null});
        that.props.onFileSuccess(JSON.parse(request.responseText));
      } else if (this.status == 500) {
        that.setState({file: false, progress: null});
        that.props.onFileError();
      }
    };
    request.upload.onprogress = function(oEvent) {
      if (oEvent.lengthComputable) {
        that.setState({ progress: Math.max(1, Math.ceil(100 * (oEvent.loaded/oEvent.total)))  })
      }
    };
    request.open('POST', this.props.url);
    request.responseType = 'text';
    request.send(formData);
    that.setState({ progress: 0 })
  },
  onChange: function(event) {
    var r = new RegExp(this.props.filter, 'i');
    var file = event.target.files[0];
    if (!(file.type||"").match(r)) {
      alert("Invalid file name");
      return false;
    }
    this.setState({ file: file });
    return false;
  },
  result: function() {
    var html = [(<div className={"alert " + (this.state.error ? "alert-danger" : "alert-success")}>{this.state.result}</div>)];
    return html;
  },
  render: function() {
    var file = this.state.file;
    if (this.state.result) {
      return <div>
          <div>{this.result()}</div>
      </div>;
    } else if (typeof this.state.progress === "number") {
        return <div>
            <div>Upload file {file.name}</div>
            <div>Uploading {this.state.progress}%</div>
        </div>;
    } else if (file) {
      return <div>
          <div>Upload file {file.name} ({humanFormat(file.size)}).</div>
      </div>;
    }
    return <input className="form-control" type="file" onChange={this.onChange} value={this.state.value}/>
  }
});
