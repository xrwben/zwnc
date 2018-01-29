<template>
  <div>
    <div class="box">
      <ul class="movebox" style="transition-duration:0.2s;transform: translateX(2rem);">
        <li style="background:red;">1</li>
        <li style="background:yellow">2</li>
        <li style="background:blue">3</li>
        <li style="background:green">4</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    mounted () {
      var moveX
      var startX
      var endX
      var cout = 0
      var movebox = document.querySelector('.movebox')
      var Li = movebox.querySelectorAll('li')
      var width = parseInt(window.getComputedStyle(movebox.parentNode).width) * 0.9
      movebox.style.width = ((width * 4 + 4 * 10) % 10) + 'rem'
      for (var i = 0; i < Li.length; i++) {
        Li[i].style.width = width + 'px'
      }
      function boxTouchStart (e) {
        var touch = e.touches[0]
        startX = touch.pageX
        endX = parseInt(movebox.style.webkitTransform.replace('translateX(', ''))
      }
      function boxTouchMove (e) {
        var touch = e.touches[0]
        moveX = touch.pageX - startX
        if (cout === 0 && moveX > 0) {
          return false
        }
        if (cout === 3 && moveX < 0) {
          return false
        }
        movebox.style.webkitTransform = 'translateX(' + (endX + moveX) + 'px)'
      }

      function boxTouchEnd (e) {
        if (moveX < 0) {
          if (cout < 3) {
            movebox.style.webkitTransform = 'translateX(' + (endX - width - 10) + 'px)'
            cout++
          }
        } else {
          if (cout === 0) {
            return false
          } else {
            movebox.style.webkitTransform = 'translateX(' + (endX + width + 10) + 'px)'
            cout--
          }
        }
      }
      movebox.addEventListener('touchstart', boxTouchStart, false)
      movebox.addEventListener('touchmove', boxTouchMove, false)
      movebox.addEventListener('touchend', boxTouchEnd, false)
    }
  }
</script>

<style>
  .box{
    width: 100%;
    height: 30rem;
    border: 1px solid red;
    overflow: hidden;
  }
  .movebox{
    height: 100%;
    position: relative;
  }
  .movebox li{
    height: 100%;
    border: 1px solid green;
    float: left;
    margin-right:10px;
  }
</style>
