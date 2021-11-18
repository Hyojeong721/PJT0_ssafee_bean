<template>
    <div>
        <li>{{ movie.title }}</li>
    </div>
</template>

<script>
export default {
    name:'NowMovieList',
    props: {
        movie: Object,
    }
}
</script>

<style>

</style>