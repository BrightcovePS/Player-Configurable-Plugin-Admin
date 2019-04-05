export default function(configs) {
  let configFeed = {
    timeColor: configs.colorSelection.color
  };
  for(let i = 0; i < configs.inputChange.inputs.length; i ++) {
    configFeed[configs.inputChange.inputs[i].fieldId] = 
    configs.inputChange.inputs[i].val;
  }
  
  return configFeed;
};