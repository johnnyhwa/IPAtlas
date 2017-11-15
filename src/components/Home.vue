<template>
	<div id="container">
		<canvas id="mouse-screen"></canvas>
	</div>
</template>

<style>
body {
  background: #eee;
}
#container {
  background: #fff;
  width: 1402px;
  margin: 0 auto;
}
#mouse-screen {
  border: 1px #000000 dashed;
}
</style>

<script>
import {Entity} from "../module/node";
export default {
  data() {
    return {
      c_width: 1400,
      c_height: 800,
      canvas: null,
      stage: null,
      con: null,
      update: true,
      ejs: null,
      fpsLabel: null,
      nodePool: [],
      nodedata: [
        { id: "1", type: "person", root: true },
        {
          photoUrl: "../assets/images/ico_root.png",
          name: "李雷",
          idNum: "330125485478521452",
          plateNum: "浙A·E4514",
          mac: "AC-AS-DF-CD-DS-SD",
          rfid: "021561451"
        },
        {
          relNode: []
        }
      ]
    };
  },
  mounted() {
    this.init();
    this.display();
  },
  methods: {
    /**
	 * @method init
	 * @description 初始化方法
	 * @returns {void}
	 */
    init() {
      this.canvas = document.getElementById("mouse-screen");
      this.con = new createjs.Container();
      this.canvas.width = this.c_width;
      this.canvas.height = this.c_height;
      this.stage = new createjs.Stage(this.canvas);
      createjs.Touch.enable(this.stage);
      this.stage.enableMouseOver();

      this.initTransform(this.con, this.stage, this.canvas);
    },

    /**
	 * @method initTransform
	 * @description 初始化画布缩放移动方法
	 * @return {void}
	 * 
	 */
    initTransform(con, stage, canvas) {
      let self = this;

      canvas.oncontextmenu = function(e) {
        return false;
      };

      stage.addEventListener("stagemousedown", event => {
        console.log(event);
        let cx = event.stageX;
        let cy = event.stageY;
        let sx = con.x;
        let sy = con.y;
        let scalex = con.scaleX;
        let scaley = con.scaleY;
        // 左键框选
        if (event.nativeEvent.button === 0 && !stage.hitTest(cx, cy)) {
          let w = 0;
          let h = 0;
          let g = new createjs.Graphics()
            .ss(1)
            .s("blue")
            .f("rgba(10,140,255,.4)")
            .dr(cx, cy, w, h);
          let command = g.command;
          let s = new createjs.Shape(g);
          s.set({
            alpha: 0.2,
            name: "recselecter"
          });
          console.log(s);
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
          // 移除选框
          stage.removeChild(stage.getChildByName("recselecter"));
          self.update = true;
        });
      });

      // 鼠标滑轮事件
      canvas.addEventListener("mousewheel", event => {
        let dir = event.wheelDelta;
        let scalex = con.scaleX;
        let scaley = con.scaleY;
        let sx = con.x;
        let sy = con.y;
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
    /**
	 * @method draw
	 * @description 绘制方法
	 * @return {void}
	 * 
	 */
    display() {
      this.drawNode(this.nodedata);
      /* let self = this;
      let con = this.con;
      let stage = this.stage;
      let arr = [];
      this.fpsLabel = new createjs.Text("-- fps", "bold 18px Arial", "#000");
      stage.addChild(this.fpsLabel);
      this.fpsLabel.x = 10;
      this.fpsLabel.y = 20;

      let img = new Image();
      img.src = require("../assets/images/ico_root.png");
      img.onload = handleImageLoad;

      function handleImageLoad(event) {
        for (let i = 0; i < 5; i++) {
          let bitmap = new createjs.Bitmap(event.target);
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
      createjs.Ticker.framerate = 30;
      createjs.Ticker.addEventListener("tick", this.tick); */
    },

    /**
	 * @method drawNode
	 * @description 节点绘制方法
	 * @returns {void}
	 * 
	 */
    drawNode(p_data) {
      console.log(p_data);
      let opt = {
       
      }
      let o = new Entity(opt);
      console.log(o)
    },
    drawLine(p_data) {

    },
    /**
	 * @method tick
	 * @description tick handle
	 * @param {Object} event
	 * @returns {void}
	 * 
	 */
    tick(event) {
      this.fpsLabel.text =
        Math.round(createjs.Ticker.getMeasuredFPS()) + " fps";
      if (this.update) {
        this.update = false;
        this.stage.update();
        //console.log(event);
      }
    }
  },
  components: {}
};
</script>
