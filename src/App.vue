<template>
  <div id="app">
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
      <a class="navbar-brand" href="#">Vue svg markdown</a>

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <a class="nav-link btn text-white"
               v-bind:class="{'btn-success': !state, 'btn-danger': state}"
               v-on:click="state = !state">
              <template v-if="!state">Start</template>
              <template v-if="state">Stop</template>
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <div id="editor-field">
      <svg id="editor-field-svg" v-on:click="addPlacemark($event)"></svg>
      <img id="editor-layout-bg" v-if="!editor.load"
           src="./assets/layout.png" @load="whenImageLoad()">
    </div>
  </div>
</template>

<script>
  import Editor from '@/classes/editor'

  export default {
    name: 'app',
    data () {
      return {
        _svg: null,
        state: false,
        editor: new Editor(),
      }
    },
    watch: {
      state () {
        if (!this.state) {
          this.editor.emptyCache();
        }
      }
    },
    computed: {
      svg: {
        get () {
          return this._svg;
        },
        set (value) {
          this._svg = value;
          this.editor.svg = value;
        }
      }
    },
    methods: {
      addPlacemark(event) {
        if (!this.state) {
          return;
        }

        const coordinates = [
          event.pageX - 1 - this.editor.getPaperPosition().left,
          event.pageY - 1 - this.editor.getPaperPosition().top,
        ];

        this.editor.addPoint(coordinates);
      },
      whenImageLoad () {
        const image = document.getElementById("editor-layout-bg"),
          size = [image.width, image.height];

        this.editor.setSize(size);
        this.editor.setLayout(image.src);
      }
    },
    mounted () {
      this.svg = document.getElementById("editor-field-svg");
    }
  }
</script>

<style lang="scss">
  #editor-field{
    border: solid #eee 1px;
    background: #eaeaea;
    padding: 1rem;
    overflow: auto;
    max-width: 100%;
    position: relative;
  }
</style>
