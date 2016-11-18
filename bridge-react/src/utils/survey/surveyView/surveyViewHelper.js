




export let onSelectDevice = (device) => {

    let stateWidths = {
        "mobile": ["320px", "568px"],
        "tablet": ["768px"],
        "default": ["100%"]
    };
    let [width,height] = stateWidths[device];
    if (!height) height = "100%";
     return {
         'width' : width,
        'height' : height
     }

}

