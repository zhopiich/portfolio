<template>
  <section
    class="caroucel w-full h-dvh overflow-hidden"
    ref="caroucel"
    :class="direction"
  >
    <div class="list h-full relative">
      <article
        class="item absolute top-0 left-0 size-full"
        v-for="(item, index) in list"
        :class="item.status.value"
      >
        <!-- main -->
        <div
          class="main-content h-full md:grid"
          :style="`background-color: ${item.color}`"
          @animationend="isSliding = false"
        >
          <div v-if="!isMobile" class="relative">
            <Luminous v-if="index + 1 === activeItem" :color="item.color3" />

            <div
              class="h-dvh flex justify-center items-center flex-col relative"
            >
              <div
                class="max-h-[calc(103px_-_var(--height-nav))] h-0 grow shrink w-full"
              ></div>
              <div
                class="w-full overflow-y-auto pt-[--height-nav] mb-[103px] bg-transparent"
              >
                <div class="flex justify-center items-center flex-col py-8">
                  <div class="shrink-0">
                    <component
                      :is="item.content"
                      :key="index"
                      :activeItem="activeItem"
                      :isSliding="isSliding"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="absolute bottom-[90px] w-full">
              <Indicators
                :color="item.color2"
                :length="list.length"
                :activeItem="activeItem"
              />
            </div>
          </div>

          <div
            v-else
            class="h-[var(--height-nav)] flex justify-center items-end"
          >
            <SlidingBanner
              :activeItem="activeItem"
              :name="item.name"
              :isActive="index + 1 === activeItem"
              :index="index"
              :textColor="item.textColor"
            />

            <div class="absolute top-[--height-nav] w-full">
              <Indicators
                :color="item.color2"
                :length="list.length"
                :activeItem="activeItem"
              />
            </div>
          </div>
        </div>

        <!-- sub slider -->
        <div
          class="slider w-[var(--width-slider)] h-full absolute top-0 flex flex-col justify-center items-center"
        >
          <div
            v-if="isMobile"
            class="size-full mt-[--height-nav] pt-[13px] overflow-auto"
          >
            <div class="w-full px-4 pb-20 *:w-full">
              <component
                :is="item.content"
                :key="index"
                :activeItem="activeItem"
                :isSliding="isSliding"
              />
            </div>
          </div>

          <div
            v-else
            class="size-full flex justify-center items-center mt-[--height-nav] mb-10"
            :style="`background-color: ${item.color2}`"
          >
            <SlidingBanner
              :activeItem="activeItem"
              :name="item.name"
              :isActive="index + 1 === activeItem"
              :index="index"
              :textColor="item.textColor"
            />
          </div>
        </div>
      </article>
    </div>

    <ArrowButtons @prev="prev" @next="next" :isSliding="isSliding" />
    <Footer />
  </section>
</template>

<script setup>
import Who from "../contents/Who.vue";
import Skills from "../contents/Skills.vue";
import Projects from "../contents/Projects.vue";
import Contact from "../contents/Contact.vue";
import Indicators from "./Indicators.vue";
import ArrowButtons from "./ArrowButtons.vue";
import Footer from "./Footer.vue";

import Luminous from "./Luminous.vue";
import SlidingBanner from "./SlidingBanner.vue";

const props = defineProps(["isMobile"]);

import { ref } from "vue";

const activeItem = ref(1);

const isSliding = ref(false);

const direction = ref("initial");

const list = [
  {
    name: "@zhopiich",
    color: "#E3D5C9",
    color2: "#A0A8A9",
    color3: "rgba(255, 254, 253, 0.15)",
    textColor: "#435F63",
    status: ref("active"),
    content: Who,
  },
  {
    name: "SKILLS",
    color: "#f5eee8",
    // color: "#edeadb",
    // color: "#fff5d9",
    // color: "#f3efdd",
    color2: "#C5C2C8",
    color3: "rgba(255, 255, 254, 0.3)",
    textColor: "#8D688D",
    status: ref("other_2"),
    content: Skills,
  },
  {
    name: "Project",
    color: "#0f172a",
    color3: "rgba(29, 78, 216, 0.15)",
    textColor: "#918BA3",
    color2: "#FFECB3",
    // color2: "#f8e5ae",
    // color2: "#F9E2AF",
    // color2: "#fae3a0",
    // color2: "#efe5cd",
    status: ref(null),
    content: Projects,
  },
  {
    name: "Contact",
    // color: "#f6f9fc",
    color: "#eeeff1",
    // color: "#e6e6e6",
    color2: "#C8C8C8",
    // color2: "#C2C5D6",
    textColor: "#6A729B",
    color3: "rgba(255, 255, 255, 0.3)",
    status: ref("other_1"),
    content: Contact,
  },
];

function slide({ indexOther1, indexActive, indexOther2 }) {
  list.forEach((item) => {
    item.status.value = null;
  });

  const domItems = document.querySelectorAll(".caroucel .item");
  domItems.forEach((item) => {
    item.querySelector(".slider div").style.animation = "none";

    void item.offsetWidth;

    item.querySelector(".slider div").style.animation = "";
  });

  list[indexOther1].status.value = "other_1";
  list[indexActive].status.value = "active";
  list[indexOther2].status.value = "other_2";
}

function next() {
  if (isSliding.value) return;
  isSliding.value = true;

  direction.value = "next";

  if (activeItem.value === list.length) {
    activeItem.value = 1;
  } else {
    activeItem.value += 1;
  }

  const itemOther1 = activeItem.value - 1,
    itemOther2 = activeItem.value + 1;

  let indexActive = activeItem.value - 1,
    indexOther1 = itemOther1 - 1,
    indexOther2 = itemOther2 - 1;

  if (itemOther1 < 1) {
    indexOther1 = list.length - 1;
  }
  if (itemOther2 > list.length) {
    indexOther2 = 0;
  }

  slide({ indexOther1, indexActive, indexOther2 });
}

function prev() {
  if (isSliding.value) return;
  isSliding.value = true;

  direction.value = "prev";

  if (activeItem.value === 1) {
    activeItem.value = list.length;
  } else {
    activeItem.value -= 1;
  }

  const indexActive = activeItem.value - 1;

  const indexOther1 = activeItem.value === list.length ? 0 : indexActive + 1;
  const indexOther2 = indexOther1 + 1 === list.length ? 0 : indexOther1 + 1;

  slide({ indexOther1, indexActive, indexOther2 });
}
</script>

<style lang="scss" scoped>
.caroucel {
  margin-top: calc(-1 * var(--height-nav));

  @media screen and (max-width: 767px) {
    --width-slider: 100%;
  }

  .list {
    .item {
      .slider {
        left: calc(100% - calc(var(--width-slider) * var(--ratio)));

        @media screen and (max-width: 767px) {
          left: 0;
        }
      }

      .main-content {
        grid-template-columns: calc(
          100% - calc(var(--width-slider) * var(--ratio))
        );
      }
    }

    &::before {
      content: "";
      position: absolute;
      width: var(--width-slider);
      height: 100%;
      top: 0;
      left: calc(100% - calc(var(--width-slider) * var(--ratio)));
      border-left: 1px solid var(--border-color);
      border-right: 1px solid var(--border-color);
      z-index: 10;
      pointer-events: none;
    }

    @media screen and (max-width: 767px) {
      &::before {
        border-left: 0px;
        border-right: 0px;
      }
    }
  }
}

.caroucel .list {
  .item {
    display: none;
  }

  .item.active,
  .item.other_1,
  .item.other_2 {
    display: block;
  }

  .item.active {
    z-index: 2;
  }

  .item.other_1,
  .item.other_2 {
    pointer-events: none;
  }
}

.caroucel.next,
.caroucel.prev {
  .item.active {
    .main-content {
      animation: showContent 0.8s ease-in 1 forwards;
    }
  }
}

.caroucel.initial {
  .item.other_2 .slider {
    z-index: 3;
    --transform-from: calc(var(--width-slider) * 2);
    transform: translateX(calc(var(--transform-from) - var(--width-slider)));
  }
}

@keyframes showContent {
  from {
    clip-path: circle(0 at 70% 50%);
  }

  to {
    clip-path: circle(100% at 70% 50%);
  }
}

@keyframes effectNext {
  from {
    transform: translateX(calc(var(--transform-from)));
  }
  to {
    transform: translateX(calc(var(--transform-from) - var(--width-slider)));
  }
}

.next {
  .item.other_2 .main-content {
    opacity: 0;
  }

  .item .slider > * {
    animation: effectNext 0.9s ease-in-out 1 forwards;
  }

  .item.active .slider {
    --transform-from: var(--width-slider);
  }

  .item.other_1 .slider {
    z-index: 3;
    --transform-from: 0px;
    overflow: hidden;
  }

  .item.other_2 .slider {
    z-index: 3;
    --transform-from: calc(var(--width-slider) * 2);
  }
}

@keyframes effectPrev {
  from {
    transform: translateX(calc(var(--transform-from)));
  }
  to {
    transform: translateX(calc(var(--transform-from) + var(--width-slider)));
  }
}

.prev {
  .item .slider > * {
    animation: effectPrev 0.9s ease-in-out 1 forwards;
  }

  .item.active .slider {
    --transform-from: calc(var(--width-slider) * -1);
    overflow: hidden;
  }

  .item.other_1 .slider {
    --transform-from: 0px;
    z-index: 3;
  }

  .item.other_2 .slider {
    --transform-from: var(--width-slider);
    z-index: 3;
  }

  .item.other_2 .main-content {
    opacity: 0;
  }
}
</style>
