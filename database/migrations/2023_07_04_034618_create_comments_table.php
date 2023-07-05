<?php

  use Illuminate\Database\Migrations\Migration;
  use Illuminate\Database\Schema\Blueprint;
  use Illuminate\Support\Facades\Schema;

  return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up () : void
    {
      Schema ::create ( 'comments' , function ( Blueprint $table ) {
        $table -> id ();
        $table -> text ( 'body' ) -> nullable ();
        $table -> timestamp ( 'comment_time' );
        $table -> integer ( 'user_id' );
        $table -> integer ( 'project_id' );
        $table -> integer ( 'comment_indicator' ) -> default ( 0 );
        $table -> integer ( 'replier_id' ) -> nullable ();
        $table -> integer ( 'parent_id' ) -> nullable ();
        $table -> string ( 'image' ) -> nullable ();

        $table -> foreign ( 'user_id' ) -> references ( 'id' ) -> on ( 'users' ) -> onDelete ( 'cascade' );
        $table -> foreign ( 'replier_id' ) -> references ( 'id' ) -> on ( 'users' ) -> onDelete ( 'cascade' );
        $table -> foreign ( 'project_id' ) -> references ( 'id' ) -> on ( 'projects' ) -> onDelete ( 'cascade' );

        $table -> timestamps ();
      } );
    }

    /**
     * Reverse the migrations.
     */
    public function down () : void
    {
      Schema ::dropIfExists ( 'comments' );
    }
  };
