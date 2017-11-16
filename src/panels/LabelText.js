const {BaseComponent} = require('./BaseComponent');
const {UpdateValueComponentEvent} = require('./event/UpdateValueComponentEvent');

/**
 * A simple component which displays a label and a text which is send from a backend
 */
class LabelText extends BaseComponent {

  /**
   *
   * @param backendId the id of the backend the label text belongs to
   * @param lblTxt the text to display as label
   * @param txtBinding the path of the value where to read the data from to display
   */
  constructor(backendId, lblTxt, txtBinding) {
    super(backendId, 'labelText');

    this.lblTxt = lblTxt;

    this.addEvent(new UpdateValueComponentEvent(txtBinding))
  }
}

exports.LabelText = LabelText;