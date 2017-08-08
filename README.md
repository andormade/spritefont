# spritefont
Renders this ![](https://github.com/andormade/spritefont/blob/master/test/test1.png?raw=true) from this ![](https://github.com/andormade/spritefont/blob/master/test/numeric.png?raw=true)

It takes and returns image buffers, so you may use it with an image parser like pngjs.

### Example

    import spritefont from 'spritefont';
    import { PNG } from 'pngjs';

    let stencil = PNG.sync.read('stencil.png').data;

    let spritefont = spritefont(stencil, 28, 2, 5, ['#000000', ['#ffffff'], ['#000000', '#ffffff']);

    PNG.sync.write('spritefont.png', spritefont);
