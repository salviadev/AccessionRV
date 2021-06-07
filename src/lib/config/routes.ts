export const config = {
    name: 'AccessionRV Doc',
    description: "Documentation de l'API AccessionRV",
    version: '1.0.0',
    licence: 'Salvia developpement',
    controllersBaseDir: 'lib/handlers',
    modelsBaseDir: 'schemas',
    debug: false,
    noBodyParser: true,
    routes: [
        {
            path: '/api/login',
            controller: {
                get: 'LoginHandler/get',
            },
            file: 'login',
        },
        {
            path: '/ViewModels/{viewModel}',
            controller: {
                post: 'ViewModelHandler/post',
            },
            file: 'viewModel',
        },
        {
            path: '/ViewModels/{viewModel}/{idViewModel}',
            controller: {
                get: 'ViewModelHandler/get',
                patch: 'ViewModelHandler/patch',
                post: 'ViewModelHandler/patch',
            },
            file: 'viewModel',
        },
        {
            path: '/profile/{action}',
            controller: {
                get: 'ProfilerHandler/get',
                patch: 'ProfilerHandler/patch',
            },
            file: 'profiler',
        },
        {
            path: '/api/ged',
            controller: 'GedHandler',
            file: 'uploadDownloadHandler',
        },
        {
            path: '/api/docmerge',
            controller: 'DocMergeHandler',
            file: 'uploadDownloadHandler',
        },
        {
            path: '/api/download/tmp/{key}',
            controller: {
                get: 'TemporaryFolderHandler/getOne'
            },
            file: 'uploadDownloadHandler',
        },
        {
            path: '/api/upload/tmp',
            controller: {
                post: 'TemporaryFolderHandler/post'
            },
            file: 'uploadDownloadHandler',
        },
        {
            path: '/api/download/templates/{file}',
            controller: {
                get: 'DownloaderFileHandler/downloadTemplates'
            },
            file: 'uploadDownloadHandler',
        },
        {
            path: '/lookup/dataset/{datasetName}',
            controller: 'DatasetHandler',
            file: 'dataset',
        },
        {
            path: '/api/database/structure',
            controller: {
                get: 'DatabaseHandler/getDatabaseStructure',
            },
            file: 'database',
        },
        {
            path: '/api/database/createScript',
            controller: {
                get: 'DatabaseHandler/getCreateScript',
            },
            file: 'database',
        },
        {
            path: '/api/database/updateScript',
            controller: {
                get: 'DatabaseHandler/getUpdateScript',
            },
            file: 'database',
        },
    ],
};
