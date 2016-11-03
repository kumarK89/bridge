const toast = require('utils/toast');

var RemovableItemMixin = {
  mixin: {
    getInitialState: function() {
      return {
        wantsToRemove: false
      };
    },

    confirmRemoval: function() {
      this.setState({ wantsToRemove: true });
    },

    isConfirmingRemoval: function() {
      return this.state.wantsToRemove;
    },

    cancelRemoval: function() {
      this.setState({ wantsToRemove: false });
    },

    remove: function() {
      if (this.props.onRemove) {
        this.props.onRemove();
      }
    }
  },

  doRemoveItemFromList: function(item, list, removal, contextType) {
    var index = list.indexOf(item);

    list.removeObject(item);

    if (removal) {
      removal.then(null, function() {
        var message = I18n.t(
          "Oh Snap! We were unable to remove this %{object}. " +
          "Please try again later.",
          { object: contextType });

        list.insertAt(Math.min(index, list.get("length")), item);
        toast(message, { type: "error" });
      });
    }
  },
};

module.exports = RemovableItemMixin;
