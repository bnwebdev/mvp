const mvp = (function(){
  const hasnt = function(){
    throw new Error('This method hasn`t defined')
  }

  class View {
    constructor(el){
      this._el = el
    }
    on(event, handler, ...params){
      this._el.addEventListener(event, handler, ...params)
    }
    render(data){
      hasnt()
    }
  }

  class Model extends EventTarget {
    constructor(model){
      super()
      for(const [key, prop] of Object.entries(model)){
        Model.observe(this, key, prop)
      }
    }
    emit(){
      this.dispatchEvent(new Event(Model.change))
    }
    static observe(target, namePlace, defaultValue = null){
      const key = `__${namePlace}`
      target[key] = defaultValue
      target[namePlace] = function(value){
        if(value !== undefined){
          this[key] = value
          this.emit()
        } 
        return this[key]
        
      }
    }
    static get change(){return 'model##change'}
  }

  class Presenter {
    constructor(model, view){
      this.model = model
      this.view = view
      model.addEventListener(Model.change, this._modelHandler.bind(this))
      this.init()
      model.emit()
    }
    _modelHandler(e){
      this.view.render(this.modelHandler(e))
    }
    modelHandler(event){
      hasnt()
    }
    init(){
      hasnt()
    }
  }
  return {Model, View, Presentor}
})()
   
