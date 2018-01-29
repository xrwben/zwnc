<template>
  <div class="integrationrules paddingTop">
    <!--顶部标题-->
    <div class="section">
      <div class="header">
        <div class="content">
          <div class="back header_left" @click="$router.go(-1)">
            <i></i><span>返回</span>
          </div>
          如何获得更多积分
          <div class="myorder header_right">
            &emsp;&emsp;&emsp;&emsp;
          </div>
        </div>
      </div>
    </div>
    <!--详细内容-->
    <div class="section">
      <div class="rules">
        <div class="content">
          <ul>
            <li>
              <h3>Q: 理财计划安全吗？ </h3>
              <p>A：积分是理财农场在用户投资等相关活动中给予的励，积分仅在理财农场使用，不可兑现，不可转让。</p>
            </li>
            <li>
              <h3>Q：积分有什么用途？ </h3>
              <p>A：（1）可在”滋味农场“兑换水果 （2）可在”积分福利社“兑换和参与各种积分活动, 换取奖励，如红包、实物奖品、积分等。</p>
            </li>
            <li>
              <h3>Q：如何获取积分？ </h3>
              <p>A：投资定期，按投资金额和投资期限获取积分，投资成功后的*分钟内，积分发放到账。 积分个数=年化定期投资金/100*年化定投资金额=定期投资金额*投资期限天数/365</p>
            </li>
            <li>
              <h3>Q：积分有有效期吗？ </h3>
              <p>A：每年的6月30日和12月31日为积分到期日，在到期日当天的24点，一年前获取且未使用的积分过期失效。每次消费积分，优势抵扣旧积分。</p>
            </li>
            <li>
              <h3>Q：积分其他规则？ </h3>
              <p>A：积分小数点后不算，向上取整。</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
  .rules{
    background: #fff;
    border-top: .1rem solid #e6e6e6;
    padding-top: 2rem;
  }
  .rules ul li{
    padding-bottom: 3rem;
  }
  .rules ul li h3{
    color: #333;
    font-size: 3.2rem;
    line-height: 6rem;
    text-indent: 1rem;
  }
  .rules ul li p{
    color: #666;
    font-size: 2.8rem;
    padding: 2.2rem;
    background: #f2f2f2;
    -webkit-border-radius: 1rem;
    -moz-border-radius: 1rem;
    border-radius: 1rem;
    line-height: 4rem;
  }
</style>
