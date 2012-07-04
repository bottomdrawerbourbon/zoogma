package Site::View::TT;

use strict;

use base 'Catalyst::View::TT';

$Template::Directive::WHILE_MAX = 5000;

__PACKAGE__->config({
    ENCODING           => 'UTF-8',
    WRAPPER            => 'site/wrapper.tt',
    TEMPLATE_EXTENSION => '.tt',
    #COMPILE_EXT        => '.ttc',
    #COMPILE_DIR        => '/var/cache/tt',
    #TIMER              => 0,
    static_root        => '/static',
    #static_build       => "20120116",
});



=head1 NAME

Site::View::TT - Catalyst View

=head1 DESCRIPTION

Catalyst View.

=head1 AUTHOR

Nicholas McCamey,,,

=head1 LICENSE

This library is free software. You can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

__PACKAGE__->meta->make_immutable;

1;
