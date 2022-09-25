<template lang="pug">
div
  label.custom-checkbox-container
    input.checkbox(
      type="checkbox",
      v-model="item.done",
      @change="$emit('onUpdateItem', item)"
      )
    span.checkmark(
      role="checkbox",
      :aria-checked="item.done",
      tabindex="0",
      :aria-labelledby="item._id"
    )
  .item-description__div
    span.item-description__span(
      :class="{'checked-item':item.done}",
      :id="item._id"
      ) {{item.description}}
    span.item-description-age__span  - {{calculateItemAge(item.updatedAt)}}
  button.remove(@click="$emit('onRemoveItem', item._id)") x
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
} from '@vue/composition-api';

import { Item } from '@/interfaces';

export default defineComponent({
  name: 'TodoItem',
  props: {
    item: {
      type: Object as PropType<Item>,
      required: false,
    },
  },
  setup() {
    function calculateItemAge(date: string): string {
      const dateMs = Date.parse(date);
      const currentMs = Date.parse(new Date().toString());

      const diffMs = currentMs - dateMs;
      const diffSecs = diffMs / 1000;

      const minInSecs = 60;
      const hrInSecs = 3600;
      const dayInSecs = 86400;

      if (diffSecs <= minInSecs && diffSecs < hrInSecs && diffSecs < dayInSecs) {
        const secs = parseInt(diffSecs.toString(), 10);
        const trailingS = secs !== 1;

        return `${secs} second${trailingS ? 's' : ''}`;
      }

      if (diffSecs <= hrInSecs && diffSecs < dayInSecs) {
        const mins = parseInt((diffSecs / 60).toString(), 10);
        const trailingS = mins !== 1;

        return `${mins} minute${trailingS ? 's' : ''}`;
      }

      if (diffSecs <= dayInSecs) {
        const hrs = parseInt((diffSecs / 3600).toString(), 10);
        const trailingS = hrs !== 1;

        return `${hrs} hour${trailingS ? 's' : ''}`;
      }

      const days = parseInt((diffSecs / 86400).toString(), 10);
      const trailingS = days !== 1;

      return `${days} day${trailingS ? 's' : ''}`;
    }

    return {
      calculateItemAge,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/static/scss/variables.scss';

:hover~.remove {
  display: flex;
}

.checked-item {
  text-decoration: line-through;
  opacity: .3;
}

.item-description__div {
  display: flex;
  align-items: baseline;
  flex: 1;
}

.item-description-age__span {
  font-size: 10px;
  color: $light-grey;
  margin-left: 1em;
}

.remove {
  font-size: 20px;
  display: none;

  &:hover {
    display: flex;
  }
}

.custom-checkbox-container {
  position: relative;
  padding-left: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ .checkmark:after {
      display: block;
    }
  }

  .checkmark {
    position: absolute;
    left: 0;
    height: 25px;
    width: 25px;
    border: $identity-border;
    border-radius: $rounded-corners-px;

    &:after {
      content: "";
      position: absolute;
      display: none;

      left: 9px;
      top: 3px;
      width: 6px;
      height: 15px;
      border: $green solid;
      border-width: 0 1px 1px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
}
</style>
