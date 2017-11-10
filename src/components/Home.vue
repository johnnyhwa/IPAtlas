<template>
  <div id="container">
    <canvas id="mouse-screen" name=""></canvas>
  </div>
</template>

<style scoped>
#container {
  width: 1200px;
  margin: 0 auto;
}
#mouse-screen {
  border: 1px #000000 dashed;
}
</style>

<script>
export default {
  data() {
    return {
      c_width: 1200,
      c_height: 600,
      canvas: null,
      stage: null,
      con: null,
      update: true,
      ejs: null
    };
  },
  mounted() {
    this.init();
    this.initTransform();
    this.draw();
  },
  methods: {
    /**
	 * @method init
	 * @description
	 * @returns {void}
	 */
    init() {
      this.canvas = document.getElementById("mouse-screen");
      this.con = new createjs.Container();
      this.canvas.width = 1200;
      this.canvas.height = 600;
      this.stage = new createjs.Stage(this.canvas);
      createjs.Touch.enable(this.stage);
      this.stage.enableMouseOver();
    },
    initTransform() {
      var self = this;
      var con = this.con;
      var stage = this.stage;
      var update = this.update;
	  var canvas = this.canvas;
	  
      canvas.oncontextmenu = function(e) {
        var e = event || window.event;

        return false;
      };
      stage.addEventListener("stagemousedown", event => {
        console.log(event);
        var cx = event.stageX;
        var cy = event.stageY;
        var sx = con.x;
        var sy = con.y;
        var scalex = con.scaleX;
		var scaley = con.scaleY;
		
		// 左键框选
        if (event.nativeEvent.button === 0) {
          var w = 0;
          var h = 0;
          var g = new createjs.Graphics()
            .ss(1)
            .s("blue")
            .f("rgba(5,120,255,.8)")
            .dr(cx, cy, w, h);
          var command = g.command;
          var s = new createjs.Shape(g);
          s.set({
            alpha: 0.2
          });
          stage.addChild(s);
          stage.addEventListener("stagemousemove", e => {
            w = e.stageX - cx;
            h = e.stageY - cy;
            command.w = w;
            command.h = h;
            self.update = true;
          });
		}
		
		// 右键点击
        if (event.nativeEvent.button === 2) {
          stage.addEventListener("stagemousemove", e => {
            con.setTransform(
              sx + e.stageX - cx,
              sy + e.stageY - cy,
              scalex,
              scaley
            );
            self.update = true;
          });
        }
        stage.addEventListener("stagemouseup", evt => {
          stage.removeAllEventListeners("stagemousemove");
          console.log(stage);
        });
	  });
	  
      // 鼠标滑轮事件
      canvas.addEventListener("mousewheel", event => {
        var dir = event.wheelDelta;
        var scalex = con.scaleX;
        var scaley = con.scaleY;
        var sx = con.x;
        var sy = con.y;
        if (dir > 0) {
          con.setTransform(sx, sy, scalex + 0.05, scaley + 0.05);
          self.update = true;
        } else {
          con.setTransform(sx, sy, scalex - 0.05, scaley - 0.05);
          self.update = true;
        }
        event.preventDefault();
      });
    },
    draw() {
      var self = this;
      var con = this.con;
      var stage = this.stage;
      var arr = [];
      var img = new Image();
      img.src = require("../assets/images/ico_root.png");
      img.onload = handleImageLoad;

      function handleImageLoad(event) {
        for (var i = 0; i < 5; i++) {
          var bitmap = new createjs.Bitmap(event.target);
          bitmap.x = 200 + 100 * i;
          bitmap.y = 300;
          bitmap.regX = 34;
          bitmap.regY = 34;
          bitmap.cursor = "pointer";
          con.addChild(bitmap);
          bitmap.on("rollover", function(evt) {
            //this.scale = 1.1;
            this.shadow = new createjs.Shadow("red", 0, 0, 3);
            self.update = true;
          });

          bitmap.on("rollout", function(evt) {
            this.scale = 1;
            this.shadow = null;
            self.update = true;
          });
          arr.push(bitmap);
        }
      }

      stage.addChild(con);
      createjs.Ticker.addEventListener("tick", this.tick);
    },
    tick(event) {
      if (this.update) {
        this.update = false;
        this.stage.update();
        console.log(event);
      }
    }
  },
  components: {}
};
</script>
