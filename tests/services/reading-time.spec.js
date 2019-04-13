import readingTime from '@services/reading-time'

describe('countWords', () => {
    test('should return 0 if an empty string is specified', () => {
        const wordCount = readingTime.countWords('')
        expect(wordCount).toEqual(0)
    })

    test('should ignore the periods, commas, colons and semicolons in the count', () => {
        const testString = 'This should. ignore, commas;;semicolons...,:: spaces, colons and periods.'
        const wordCount = readingTime.countWords(testString)

        expect(wordCount).toBeTruthy()
        expect(wordCount).toEqual(9)
    })

    test('should not ignore numbers', () => {
        const testString = 'Everyone knows that the meaning of the universe is 42 and thus should not be ignored'
        const wordCount = readingTime.countWords(testString)

        expect(wordCount).toBeTruthy()
        expect(wordCount).toEqual(16)
    })
})

describe('minutesToRead', () => {
    test('should return 0 if an empty string is specified', () => {
        const minutes = readingTime.minutesToRead('')
        expect(minutes).toEqual(0)
    })

    test('should return 1 minute when given 200 words', () => {
        const testString = `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mollis lacus id diam vulputate, in luctus nunc blandit. Aliquam tincidunt tellus eget ante volutpat, eu feugiat nisi pretium. Nam tempor sapien ac magna faucibus convallis. Vivamus lacinia mauris ligula, non tincidunt odio viverra vel. Donec congue blandit urna ut vulputate. Vestibulum tempor auctor nisi aliquet feugiat. In at ante posuere risus tempor blandit. Nunc scelerisque finibus justo, id dignissim orci varius sed. Duis velit turpis, interdum ac lacus vitae, luctus tincidunt neque.
        Mauris nibh metus, maximus sed eleifend et, hendrerit id lectus. Nullam euismod ullamcorper erat. Ut suscipit finibus ante, sed tempus dui efficitur eu. Morbi purus nisi, pretium in consectetur vel, pulvinar eu metus. Integer sagittis nisl hendrerit malesuada eleifend. Aenean euismod semper condimentum. In hac habitasse platea dictumst. Quisque consectetur turpis sed purus convallis, sed iaculis metus facilisis. Proin eu lectus egestas neque elementum tempor tempor in mi. Aenean eu ornare enim. Donec at quam imperdiet, volutpat velit sit amet, convallis libero.
        Proin rhoncus sit amet diam vel interdum. Nullam lobortis tortor nisi, eu gravida lectus sodales non. Nunc sit amet nibh nulla. In molestie quam tellus, ut rutrum neque euismod eget. Ut a malesuada sem. Cras vel.
        `
        const minutes = readingTime.minutesToRead(testString)
        expect(minutes).toEqual(1)
    })

    test('should return 5 minutes when given 1000 words', () => {
        const testString = `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dui magna, iaculis non justo at, viverra ornare sapien. Etiam et lorem fermentum, pellentesque eros quis, euismod nibh. Sed pharetra orci a dolor accumsan interdum. Nunc pellentesque varius metus sed egestas. Sed varius a ante eu interdum. Nullam tempor urna ipsum, eget rhoncus velit imperdiet dapibus. Proin vitae justo mi. Aenean sagittis nec sapien eget pulvinar. Sed ac tristique lorem.
        Ut maximus ligula et dolor dapibus, sed scelerisque turpis egestas. Vestibulum at venenatis velit. Suspendisse nec ex ut elit aliquet pretium. Nunc tincidunt purus ac mattis dapibus. Nulla gravida pharetra dui, et molestie nisl feugiat quis. Fusce ut dictum lectus, eget gravida tortor. Donec magna lectus, gravida ut placerat ut, rhoncus nec massa. Duis euismod quam non purus rhoncus condimentum. Vestibulum a neque risus. Integer molestie nunc nibh, vitae mollis nulla pharetra sed. Sed efficitur eros lacinia massa semper, sed cursus quam interdum. Duis nulla ex, molestie faucibus tempor at, congue eget dolor.
        Vivamus ultricies arcu lorem, at dignissim risus hendrerit quis. Nulla at felis ante. Maecenas varius, ex ut sollicitudin dapibus, tellus erat mollis tellus, non imperdiet nisl lorem id neque. Morbi elementum malesuada finibus. Ut nec quam dignissim velit dapibus ultricies. Aenean leo ex, pulvinar quis velit ut, interdum tempus diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur tincidunt, mi nec scelerisque luctus, enim mi dictum mi, lobortis porttitor diam urna in dolor. Curabitur ultrices consectetur justo porta sollicitudin. Fusce id pharetra justo, vitae bibendum augue. Sed laoreet purus a scelerisque auctor. Suspendisse ac tellus in diam rutrum fermentum. Integer feugiat nisl interdum lorem congue, eget eleifend ante volutpat.
        Suspendisse purus turpis, fringilla quis augue vulputate, ultrices consectetur sem. Nunc luctus, justo et sodales tincidunt, tellus sapien varius tortor, eu venenatis augue lorem et mauris. Nullam eget sapien imperdiet, interdum metus quis, consectetur urna. Cras velit leo, venenatis et ipsum in, maximus commodo neque. Nam consequat lorem eget purus volutpat, ut imperdiet tortor tempor. Vivamus in tristique quam, sit amet mattis sapien. Aliquam iaculis turpis ipsum, in venenatis nisi finibus ut. Donec placerat luctus est non tristique.
        Proin quis urna convallis, malesuada felis sit amet, interdum magna. Quisque metus magna, varius sed neque vel, suscipit volutpat risus. Aenean nec pulvinar urna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc iaculis tellus vel lectus hendrerit, a accumsan ligula rhoncus. Nam ornare libero neque, et rutrum augue rutrum nec. Morbi tincidunt sem eu rhoncus ornare. Nunc gravida malesuada sem, iaculis dignissim enim.
        Donec varius eu urna sit amet lobortis. Nullam ex nibh, tincidunt sit amet lacus id, tincidunt ornare nisi. Etiam turpis quam, ultricies vitae felis vitae, tempor dapibus leo. Duis ornare mi at turpis congue tempus et quis sem. Sed ullamcorper malesuada blandit. Aliquam id lacus convallis ante ullamcorper tincidunt. Nam pellentesque magna sit amet tristique imperdiet. Nulla et rutrum justo. Vestibulum eros augue, euismod eu tortor et, dictum interdum massa. Duis porta eu orci at rutrum. Morbi pellentesque nisl ut lectus facilisis consectetur. Nunc vulputate neque sed tortor auctor hendrerit.
        Mauris ullamcorper odio vitae nibh tincidunt, viverra ultrices tortor scelerisque. Nunc suscipit, augue molestie interdum efficitur, lorem neque ultrices sapien, ac tempus tellus dui vel magna. Aliquam pellentesque pellentesque quam in egestas. In luctus mi magna, a varius enim blandit sed. Quisque eget urna sed metus facilisis volutpat. Pellentesque convallis quis ante vel faucibus. Aenean ac turpis quis nulla eleifend ultricies in quis odio. Suspendisse quis vestibulum dui. Fusce rhoncus ex eget congue pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut et tortor velit. Sed orci mi, bibendum sit amet varius consequat, maximus tincidunt sem. Pellentesque et dolor porta, cursus nibh vehicula, pulvinar nibh. Suspendisse eu dui feugiat, tincidunt nisl eu, dapibus lacus.
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam hendrerit feugiat feugiat. Aliquam erat volutpat. Duis laoreet, est suscipit vestibulum ultrices, ex ex tempor quam, sed feugiat dui augue et metus. Morbi ultrices dui in turpis mattis, eu convallis ligula ornare. Vestibulum et tortor varius ante porttitor vestibulum in vel purus. Nullam eleifend ante nec auctor lobortis. Phasellus id scelerisque elit. Nulla facilisi. Mauris placerat gravida porttitor. Sed mollis auctor dignissim. Nulla quis pellentesque turpis.
        Proin tempor justo tempor nisi sagittis congue. Aliquam ut sodales erat, vel dignissim tellus. Nulla lobortis venenatis felis eget faucibus. Quisque tristique mi ac tempor imperdiet. Cras interdum elementum justo quis scelerisque. Nunc nec lacinia metus, eget tempus lectus. Sed velit libero, mattis sit amet volutpat eu, mattis sit amet tellus. Vivamus tempus velit nibh, mattis scelerisque nisl placerat vulputate. Fusce a nisl neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean ipsum lectus, accumsan at turpis cursus, dignissim iaculis risus. Maecenas feugiat velit at purus posuere, convallis blandit sapien malesuada.
        Praesent dapibus luctus pellentesque. Suspendisse finibus placerat urna, ac finibus ligula tincidunt vel. Fusce molestie diam elit, ut vulputate nunc ullamcorper ac. Sed et lectus maximus, pharetra augue id, accumsan ante. Sed mollis mollis tortor, vel iaculis nulla consectetur ac. Nam erat tellus, ullamcorper quis dignissim a, euismod non nunc. Sed eu neque velit. Quisque dapibus laoreet arcu.
        Vivamus eget felis a orci rutrum mattis. In ut suscipit ipsum. Quisque tempor id mi at luctus. Vivamus sit amet efficitur ante, a tristique mi. Vestibulum non sagittis nunc. Quisque quis purus ac libero tincidunt laoreet. Sed sodales neque vehicula, congue felis id, ultrices urna. Suspendisse et sodales neque.
        Vestibulum sapien eros, facilisis in metus vitae, porta maximus eros. Phasellus ultrices, quam eu tempus volutpat, quam arcu ultrices tellus, imperdiet tincidunt lectus risus ac nibh. Cras nec nibh nec tortor faucibus mollis. Aliquam erat volutpat. In hac habitasse platea dictumst. Quisque elementum eros hendrerit cursus feugiat. Pellentesque pulvinar semper elit. Mauris in egestas nunc. Donec imperdiet, mauris quis consequat pharetra, enim quam blandit leo, sit amet posuere lacus nunc et diam. Nunc vestibulum eleifend libero, non scelerisque erat maximus in. Nunc pulvinar, arcu a eleifend malesuada.
        `
        const minutes = readingTime.minutesToRead(testString)
        expect(minutes).toEqual(5)
    })
})
