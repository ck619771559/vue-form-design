<template>
  <div class="simulator_wrap" :style="mobileStyle">
    <div class="simulator ">
      <div class="simulator-phone" style="">
        <div class="simulator-phone-header">
          <div class="simulator-phone-status-bar">
            <div class="simulator-phone-status-bar__left">
              <img
                src="../../../assets/iphone/1.png"
                class="iphone_status_icon_1"
              />
              <img
                src="../../../assets/iphone/2.png"
                class="iphone_status_icon_2"
              />
            </div>
            <div class="simulator-phone-status-bar__center">{{ time }} AM</div>
            <div class="simulator-phone-status-bar__right">
              <img
                src="../../../assets/iphone/3.png"
                class="iphone_status_icon_3"
              />
              <img
                src="../../../assets/iphone/5.png"
                class="iphone_status_icon_5"
              />
              <img
                src="../../../assets/iphone/4.png"
                class="iphone_status_icon_4"
              />
            </div>
          </div>
          <div class="simulator-phone-title">
            <img
              src="../../../assets/iphone/btn_navbar_back@2x.png"
              class="simulator-phone-title__back"
            />
            表单模拟
            <!--            <img-->
            <!--              src="../assets/iphone/btn_navbar_more@2x.png"-->
            <!--              class="simulator-phone-title__more"-->
            <!--            />-->
          </div>
        </div>
        <div class="simulator-phone-body">
          <slot></slot>
        </div>

        <div class="simulator-phone-navbar"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { simulatorSize } from "@/config/simulatorSize";
export default {
  name: "simulator",
  props: ["mobileTypes"],
  data() {
    return {
      time: this.getCurTime()
    };
  },
  computed: {
    mobileStyle() {
      const _ = simulatorSize[this.mobileTypes];
      return `--simulator-multiple:${_.m};--simulator-width:${_.w}px;--simulator-height:${_.h}px`;
    }
  },
  methods: {
    getCurTime() {
      const curDate = new Date();
      return `${curDate.getHours()}:${curDate.getMinutes()}`;
    }
  },
  destroyed() {
    this.timer && clearInterval(this.timer);
  },
  created() {
    this.timer = setInterval(() => {
      const tempTime = this.getCurTime();
      this.time !== tempTime && (this.time = this.getCurTime());
    }, 1000);
  }
};
</script>

<style scoped lang="less">
@import "src/assets/variable";

.simulator_wrap {
  --simulator-multiple: 2; //倍数
  --simulator-width: 375px;
  --simulator-height: 667px;
  height: 100%;
  padding-top: 20px;
}

.simulator {
  margin: auto;

  .controller,
  .operation {
    width: 100%;
    height: 42px;
    .bg_shadow_white();
    display: flex;
    text-align: center;
  }

  .simulator-phone {
    margin: auto;
    position: relative;
    background: #6f7180;
    width: var(--simulator-width);
    height: var(--simulator-height);
    .box-shadow-border();
    box-sizing: content-box;
    display: flex;
    flex-direction: column;
    user-select: none;

    .simulator-phone-header {
      .simulator-phone-status-bar {
        padding: 0 calc(12px / var(--simulator-multiple));
        .simulator-calc-height(40px);
        .simulator-calc-line-height(40px);
        .simulator-calc-font-size(24px);
        background: #fff;
        font-weight: 600;
        text-align: center;
        color: #000;
        display: flex;
        justify-content: space-between;

        .iphone_status_icon_1 {
          .simulator-calc-width(33px);
          .simulator-calc-height(20px);
          margin-right: calc(8px / var(--simulator-multiple));
        }

        .iphone_status_icon_2 {
          .simulator-calc-width(29px);
          .simulator-calc-height(20px);
        }

        .iphone_status_icon_3 {
          .simulator-calc-width(14px);
          .simulator-calc-height(24px);
          margin-right: calc(13px / var(--simulator-multiple));
        }

        .iphone_status_icon_4 {
          .simulator-calc-width(53px);
          .simulator-calc-height(23px);
        }

        .iphone_status_icon_5 {
          .simulator-calc-width(59px);
          .simulator-calc-height(20px);
          margin-right: calc(7px / var(--simulator-multiple));
        }

        .simulator-phone-status-bar__center {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .simulator-phone-status-bar__right,
        .simulator-phone-status-bar__left {
          .flex-center-center();
        }
      }

      .simulator-phone-title {
        .simulator-calc-line-height(88px);
        .simulator-calc-height(88px);
        .simulator-calc-font-size(32px);
        text-align: center;
        color: #000;
        background: #fff;
        font-weight: 600;
        position: relative;

        .simulator-phone-title__back {
          .simulator-calc-width(26px);
          .simulator-calc-height(42px);
          .simulator-calc-left(32px);
          .abs_center;
        }

        .simulator-phone-title__more {
          .simulator-calc-width(44px);
          .simulator-calc-height(8px);
          .simulator-calc-right(48px);
          .abs_center;
        }
      }
    }

    .simulator-phone-body {
      background: #fff;
      height: 100%;
      overflow-y: auto;

      .hide-scrollbar();

      .long-img {
        display: block;
      }

      .registered-account-float-btn {
        .simulator-calc-width(100px);
        .simulator-calc-height(100px);
        background: rgba(36, 77, 218, 1);
        box-shadow: 0px calc(5px / var(--simulator-multiple))
          calc(10px / var(--simulator-multiple)) 0px rgba(0, 29, 138, 0.3);
        border-radius: 50%;
        position: absolute;
        .simulator-calc-bottom(200px);
        .simulator-calc-left(14px);
        .simulator-calc-font-size(24px);
        font-weight: bold;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 1.2;
        z-index: 999;
      }

      .registered-account-btn {
        z-index: 999;
        position: absolute;
        bottom: 0;
        width: calc(100% - (30px * 2 / var(--simulator-multiple)));
        margin: 0 calc(30px / var(--simulator-multiple))
          calc(30px / var(--simulator-multiple));
        .simulator-calc-height(88px);
        .simulator-calc-line-height(88px);
        background: rgba(36, 77, 218, 1);
        box-shadow: 0px calc(5px / var(--simulator-multiple))
          calc(10px / var(--simulator-multiple)) 0px rgba(0, 29, 138, 0.3);
        border-radius: calc(10px / var(--simulator-multiple));

        display: flex;

        .registered-account-btn__item {
          flex: 1;
          .simulator-calc-font-size(30px);
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          text-align: center;
          position: relative;

          &:before {
            content: " ";
            position: absolute;
            .simulator-calc-width(2px);
            .simulator-calc-height(30px);
            background: rgba(255, 255, 255, 0.3);
            right: -1px;
            top: 50%;
            transform: translateY(-50%);
          }

          &:last-child:before {
            content: none;
          }
        }
      }
    }

    .simulator-phone-navbar {
      height: 0;
    }
  }
}

.modify__warp {
  /*padding-left: 500px;*/
  /*padding-bottom: 30px;*/
  flex: 1;
}

.modify {
  .modify-item {
    max-width: 1000px;
    min-width: 600px;
    margin-top: 20px;
    border-radius: 0;
    position: relative;
    .box-shadow-border();

    #appealState {
      display: inline-block;
      width: 200px;
      .label {
        margin-right: 20px;
      }
    }
    .modify-item-title {
      font-size: @font_size_title;
      font-weight: 600;
      color: @color_block;
    }

    .modify-item-controller {
      margin: 10px 0 20px 0;
      font-size: @font_size_litter_content;
      color: @color_333;

      .modify-item-controller__phone_number {
        margin: 0 10px;
      }

      .upload-img {
        display: inline-block;

        .el-upload--text {
          width: initial;
          height: initial;
          border: none;
        }
      }
    }

    .modify-item-info {
      color: @color_666;
      font-size: @font_size_litter_content;
      line-height: 2;
    }

    .modify-item-image__preview {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 100px;
      height: 200px;
      overflow: hidden;
    }
  }
}
</style>

<style lang="less">
.simulator-phone-body {
  .el-col-xs-0 {
    display: none;
    width: 0;
  }
  .el-col-xs-offset-0 {
    margin-left: 0;
  }
  .el-col-xs-pull-0 {
    position: relative;
    right: 0;
  }
  .el-col-xs-push-0 {
    position: relative;
    left: 0;
  }
  .el-col-xs-1 {
    width: 4.16667%;
  }
  .el-col-xs-offset-1 {
    margin-left: 4.16667%;
  }
  .el-col-xs-pull-1 {
    position: relative;
    right: 4.16667%;
  }
  .el-col-xs-push-1 {
    position: relative;
    left: 4.16667%;
  }
  .el-col-xs-2 {
    width: 8.33333%;
  }
  .el-col-xs-offset-2 {
    margin-left: 8.33333%;
  }
  .el-col-xs-pull-2 {
    position: relative;
    right: 8.33333%;
  }
  .el-col-xs-push-2 {
    position: relative;
    left: 8.33333%;
  }
  .el-col-xs-3 {
    width: 12.5%;
  }
  .el-col-xs-offset-3 {
    margin-left: 12.5%;
  }
  .el-col-xs-pull-3 {
    position: relative;
    right: 12.5%;
  }
  .el-col-xs-push-3 {
    position: relative;
    left: 12.5%;
  }
  .el-col-xs-4 {
    width: 16.66667%;
  }
  .el-col-xs-offset-4 {
    margin-left: 16.66667%;
  }
  .el-col-xs-pull-4 {
    position: relative;
    right: 16.66667%;
  }
  .el-col-xs-push-4 {
    position: relative;
    left: 16.66667%;
  }
  .el-col-xs-5 {
    width: 20.83333%;
  }
  .el-col-xs-offset-5 {
    margin-left: 20.83333%;
  }
  .el-col-xs-pull-5 {
    position: relative;
    right: 20.83333%;
  }
  .el-col-xs-push-5 {
    position: relative;
    left: 20.83333%;
  }
  .el-col-xs-6 {
    width: 25%;
  }
  .el-col-xs-offset-6 {
    margin-left: 25%;
  }
  .el-col-xs-pull-6 {
    position: relative;
    right: 25%;
  }
  .el-col-xs-push-6 {
    position: relative;
    left: 25%;
  }
  .el-col-xs-7 {
    width: 29.16667%;
  }
  .el-col-xs-offset-7 {
    margin-left: 29.16667%;
  }
  .el-col-xs-pull-7 {
    position: relative;
    right: 29.16667%;
  }
  .el-col-xs-push-7 {
    position: relative;
    left: 29.16667%;
  }
  .el-col-xs-8 {
    width: 33.33333%;
  }
  .el-col-xs-offset-8 {
    margin-left: 33.33333%;
  }
  .el-col-xs-pull-8 {
    position: relative;
    right: 33.33333%;
  }
  .el-col-xs-push-8 {
    position: relative;
    left: 33.33333%;
  }
  .el-col-xs-9 {
    width: 37.5%;
  }
  .el-col-xs-offset-9 {
    margin-left: 37.5%;
  }
  .el-col-xs-pull-9 {
    position: relative;
    right: 37.5%;
  }
  .el-col-xs-push-9 {
    position: relative;
    left: 37.5%;
  }
  .el-col-xs-10 {
    width: 41.66667%;
  }
  .el-col-xs-offset-10 {
    margin-left: 41.66667%;
  }
  .el-col-xs-pull-10 {
    position: relative;
    right: 41.66667%;
  }
  .el-col-xs-push-10 {
    position: relative;
    left: 41.66667%;
  }
  .el-col-xs-11 {
    width: 45.83333%;
  }
  .el-col-xs-offset-11 {
    margin-left: 45.83333%;
  }
  .el-col-xs-pull-11 {
    position: relative;
    right: 45.83333%;
  }
  .el-col-xs-push-11 {
    position: relative;
    left: 45.83333%;
  }
  .el-col-xs-12 {
    width: 50%;
  }
  .el-col-xs-offset-12 {
    margin-left: 50%;
  }
  .el-col-xs-pull-12 {
    position: relative;
    right: 50%;
  }
  .el-col-xs-push-12 {
    position: relative;
    left: 50%;
  }
  .el-col-xs-13 {
    width: 54.16667%;
  }
  .el-col-xs-offset-13 {
    margin-left: 54.16667%;
  }
  .el-col-xs-pull-13 {
    position: relative;
    right: 54.16667%;
  }
  .el-col-xs-push-13 {
    position: relative;
    left: 54.16667%;
  }
  .el-col-xs-14 {
    width: 58.33333%;
  }
  .el-col-xs-offset-14 {
    margin-left: 58.33333%;
  }
  .el-col-xs-pull-14 {
    position: relative;
    right: 58.33333%;
  }
  .el-col-xs-push-14 {
    position: relative;
    left: 58.33333%;
  }
  .el-col-xs-15 {
    width: 62.5%;
  }
  .el-col-xs-offset-15 {
    margin-left: 62.5%;
  }
  .el-col-xs-pull-15 {
    position: relative;
    right: 62.5%;
  }
  .el-col-xs-push-15 {
    position: relative;
    left: 62.5%;
  }
  .el-col-xs-16 {
    width: 66.66667%;
  }
  .el-col-xs-offset-16 {
    margin-left: 66.66667%;
  }
  .el-col-xs-pull-16 {
    position: relative;
    right: 66.66667%;
  }
  .el-col-xs-push-16 {
    position: relative;
    left: 66.66667%;
  }
  .el-col-xs-17 {
    width: 70.83333%;
  }
  .el-col-xs-offset-17 {
    margin-left: 70.83333%;
  }
  .el-col-xs-pull-17 {
    position: relative;
    right: 70.83333%;
  }
  .el-col-xs-push-17 {
    position: relative;
    left: 70.83333%;
  }
  .el-col-xs-18 {
    width: 75%;
  }
  .el-col-xs-offset-18 {
    margin-left: 75%;
  }
  .el-col-xs-pull-18 {
    position: relative;
    right: 75%;
  }
  .el-col-xs-push-18 {
    position: relative;
    left: 75%;
  }
  .el-col-xs-19 {
    width: 79.16667%;
  }
  .el-col-xs-offset-19 {
    margin-left: 79.16667%;
  }
  .el-col-xs-pull-19 {
    position: relative;
    right: 79.16667%;
  }
  .el-col-xs-push-19 {
    position: relative;
    left: 79.16667%;
  }
  .el-col-xs-20 {
    width: 83.33333%;
  }
  .el-col-xs-offset-20 {
    margin-left: 83.33333%;
  }
  .el-col-xs-pull-20 {
    position: relative;
    right: 83.33333%;
  }
  .el-col-xs-push-20 {
    position: relative;
    left: 83.33333%;
  }
  .el-col-xs-21 {
    width: 87.5%;
  }
  .el-col-xs-offset-21 {
    margin-left: 87.5%;
  }
  .el-col-xs-pull-21 {
    position: relative;
    right: 87.5%;
  }
  .el-col-xs-push-21 {
    position: relative;
    left: 87.5%;
  }
  .el-col-xs-22 {
    width: 91.66667%;
  }
  .el-col-xs-offset-22 {
    margin-left: 91.66667%;
  }
  .el-col-xs-pull-22 {
    position: relative;
    right: 91.66667%;
  }
  .el-col-xs-push-22 {
    position: relative;
    left: 91.66667%;
  }
  .el-col-xs-23 {
    width: 95.83333%;
  }
  .el-col-xs-offset-23 {
    margin-left: 95.83333%;
  }
  .el-col-xs-pull-23 {
    position: relative;
    right: 95.83333%;
  }
  .el-col-xs-push-23 {
    position: relative;
    left: 95.83333%;
  }
  .el-col-xs-24 {
    width: 100%;
  }
  .el-col-xs-offset-24 {
    margin-left: 100%;
  }
  .el-col-xs-pull-24 {
    position: relative;
    right: 100%;
  }
  .el-col-xs-push-24 {
    position: relative;
    left: 100%;
  }
}
</style>
