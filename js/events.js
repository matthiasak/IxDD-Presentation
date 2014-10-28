function stateUpdater(){ // fine-tuned state updates
    var debouncedScroll = debounce(scrollHandler, 16);
    return function(e){ // then call debouncedScroll
        debouncedScroll(e);
    }
}
function scrollHandler(){ /* handle visual updates with requestAnimationFrame()*/ }
function startBindings(){
    var updater = stateUpdater(),
        win = $(document.body);
    win.on('touchmove mousemove PointerMove', updater);
    win.on('touchend mouseup PointerUp', function(){
        win.off('touchmove mousemove PointerMove', updater);
    });
}
// bind late, unbind ASAP
$(document.body).on('touchstart mousedown PointerDown', startBindings);